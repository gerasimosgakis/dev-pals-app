import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from "./types";
import { API } from "aws-amplify";

// Get current profile
export const getCurrentProfile = id => async dispatch => {
  dispatch(setProfileLoading());

  try {
    const profiles = await API.get("devpals", `/profiles/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: profiles
    });
    console.log(profiles);
  } catch (err) {
    dispatch({
      type: GET_PROFILE,
      payload: []
    });
  }
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
