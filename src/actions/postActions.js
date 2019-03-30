import { API } from "aws-amplify";
import { ADD_POST, GET_ERRORS } from "./types";
import gravatar from "gravatar";

// Add Post
export const addPost = (user, email, postData, history) => async dispatch => {
  const avatar = gravatar.url(email, {
    s: "100", // size
    r: "pg", // rating
    d: "mm" //default
  });
  console.log(avatar);
  postData.avatar = avatar;
  console.log(postData);
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
