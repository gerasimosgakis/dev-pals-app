import { API } from "aws-amplify";
import { ADD_POST, GET_POSTS, GET_ERRORS, POST_LOADING } from "./types";
import gravatar from "gravatar";

// Add Post
export const addPost = (user, email, postData, history) => async dispatch => {
  const avatar = gravatar.url(email, {
    s: "100", // size
    r: "pg", // rating
    d: "mm" //default
  });
  postData.avatar = avatar;

  try {
    const post = await API.post("devpals", `/posts`, {
      body: postData,
      headers: {
        // set custom header id for testing
        "cognito-identity-id": user
      }
    });
    dispatch({
      type: ADD_POST,
      payload: post
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// Get Posts
export const getPosts = () => async dispatch => {
  dispatch(setPostLoading());
  try {
    const posts = await API.get("devpals", `/posts`);
    dispatch({
      type: GET_POSTS,
      payload: posts
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_POSTS,
      payload: null
    });
  }
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
