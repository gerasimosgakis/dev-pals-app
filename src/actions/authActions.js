import { Auth } from "aws-amplify";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => async dispatch => {
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
    dispatch({
      type: SET_CURRENT_USER,
      payload: newUser
    });
    //history.push("/login");
    console.log(newUser);
  } catch (err) {
    if (err.code === "UsernameExistsException") {
      await Auth.resendSignUp(userData.email);
      const newUser = {
        username: userData.email,
        password: userData.password
      };
      dispatch({
        type: SET_CURRENT_USER,
        payload: newUser
      });
    } else {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    }
  }
};

export const confirmUser = (userData, history) => async dispatch => {
  console.log(userData);
  try {
    await Auth.confirmSignUp(userData.username, userData.confirmationCode);
    history.push("/login");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// try {
//   await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
//   await Auth.signIn(this.state.email, this.state.password);

//   this.props.userHasAuthenticated(true);
//   this.props.history.push("/");
// } catch (err) {
//   alert(err.message);
//   this.setState({ isLoading: false });
// }
