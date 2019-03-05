import { Auth } from "aws-amplify";
import { GET_ERRORS } from "./types";

// Register User
export const registerUser = userData => async dispatch => {
  // try {
  //   const newUser = await Auth.signUp({
  //     username: this.state.email,
  //     password: this.state.password
  //   });
  //   this.setState({
  //     newUser
  //   });
  // } catch (err) {
  //   console.log(err);
  //   if (err.code === "UsernameExistsException") {
  //     await Auth.resendSignUp(this.state.email);
  //     const newUser = {
  //       username: this.state.email,
  //       password: this.state.password
  //     };
  //     this.setState({
  //       newUser
  //     });
  //   }
  // }
  try {
    console.log(userData);
    const newUser = await Auth.signUp({
      username: userData.email,
      password: userData.password
    });
    console.log(newUser);
  } catch (err) {
    console.log("hi");
    dispatch({
      type: GET_ERRORS,
      payload: err.message
    });
  }
};
