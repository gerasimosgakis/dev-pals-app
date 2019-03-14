import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";
import { API } from "aws-amplify";

// Get current profile
export const getCurrentProfile = id => async dispatch => {
  dispatch(setProfileLoading());

  try {
    const profiles = await API.get("devpals", `/profiles/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: profiles.length > 0 ? { ...profiles } : {}
    });
    console.log(profiles);
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
