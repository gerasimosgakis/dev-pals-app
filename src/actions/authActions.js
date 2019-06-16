import { Auth } from "aws-amplify";
import { GET_ERRORS, SET_CURRENT_USER, RESET_USER } from "./types";
import gravatar from "gravatar";

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
  if (userData.password !== userData.confirmPassword) {
    dispatch({
      type: GET_ERRORS,
      payload: { message: `Passwords don't match` }
    });
    return;
  }
  try {
    const newUser = await Auth.signUp({
      username: userData.email,
      password: userData.password,
      attributes: {
        name: userData.name
      }
    });
    dispatch({
      type: SET_CURRENT_USER,
      payload: newUser
    });
    //history.push("/login");
  } catch (err) {
    if (err.code === "UsernameExistsException") {
      await Auth.resendSignUp(userData.email);
      const newUser = {
        username: userData.email,
        password: userData.password,
        attributes: {
          name: userData.name
        }
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
    await Auth.confirmSignUp(userData.email, userData.confirmationCode);
    history.push("/login");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

export const loginUser = (userData, history) => async dispatch => {
  try {
    await Auth.signIn(userData.email, userData.password);
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    });
    const avatar = gravatar.url(userData.email, {
      s: "30", // size
      r: "pg", // rating
      d: "mm" //default
    });
    user.avatar = avatar;
    dispatch({
      type: SET_CURRENT_USER,
      payload: user
    });
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
    if (err.code === "UserNotConfirmedException") {
      history.push("/register");
      try {
        await Auth.resendSignUp(userData.email);
        const newUser = {
          user: {
            username: userData.email,
            password: userData.password,
            attributes: {
              name: userData.name
            }
          }
        };
        dispatch({
          type: SET_CURRENT_USER,
          payload: newUser
        });
      } catch (err) {
        dispatch({
          type: GET_ERRORS,
          payload: err
        });
      }
    }
  }
};

export const loginSavedUser = history => async dispatch => {
  try {
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    });
    const avatar = gravatar.url(user.attributes.email, {
      s: "30", // size
      r: "pg", // rating
      d: "mm" //default
    });
    user.avatar = avatar;
    dispatch({
      type: SET_CURRENT_USER,
      payload: user
    });
    history.push("/dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

export const logoutUser = history => async dispatch => {
  try {
    await Auth.signOut();
    dispatch({
      type: RESET_USER
    });
    history.push("/");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err
    });
  }
};

// try {
//   await Auth.signIn(this.state.email, this.state.password);
//   // alert("Logged in");
//   this.props.userHasAuthenticated(true);
//   this.props.history.push("/");
// } catch (err) {
//   alert(err.message);
// }

// try {
//   await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
//   await Auth.signIn(this.state.email, this.state.password);

//   this.props.userHasAuthenticated(true);
//   this.props.history.push("/");
// } catch (err) {
//   alert(err.message);
//   this.setState({ isLoading: false });
// }
