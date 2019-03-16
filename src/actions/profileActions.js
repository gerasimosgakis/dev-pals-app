import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS
} from "./types";
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

// Create Profile
export const createProfile = (user, profileData, history) => async dispatch => {
  console.log(profileData);
  try {
    await API.post("devpals", "/profiles", {
      body: profileData,
      headers: {
        // set custom header id for testing
        "cognito-identity-id": user
      }
    });
    history.push("/dashboard");
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err
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
