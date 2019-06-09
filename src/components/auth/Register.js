import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import TextFieldGroup from "../common/TextFieldGroup";

import { connect } from "react-redux";
import { registerUser, confirmUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      user: null,
      errors: {}
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    this.props.registerUser(newUser, this.props.history);

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

    this.setState({ isLoading: false });
  };

  onConfirmationSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const userConfirm = {
      email: this.props.auth.user.user.username,
      confirmationCode: this.state.confirmationCode
    };

    this.props.confirmUser(userConfirm, this.props.history);

    // try {
    //   await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
    //   await Auth.signIn(this.state.email, this.state.password);

    //   this.props.userHasAuthenticated(true);
    //   this.props.history.push("/");
    // } catch (err) {
    //   alert(err.message);
    //   this.setState({ isLoading: false });
    // }
  };

  renderConfirmationForm() {
    return (
      <form onSubmit={this.onConfirmationSubmit}>
        <TextFieldGroup
          placeholder="Confirmation Code"
          name="confirmationCode"
          type="text"
          value={this.state.confirmationCode}
          onChange={this.onChange}
        />
        {/* <LoaderButton
          block
          beSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying..."
        /> */}
        {/* <input type="submit" className="btn btn-info btn-block mt-4" /> */}
        <button className="register__form-buttons submit-btn">Submit</button>
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.onSubmit}>
        <TextFieldGroup
          placeholder="Name"
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.onChange}
        />
        <TextFieldGroup
          placeholder="Email Address"
          name="email"
          type="email"
          value={this.state.email}
          onChange={this.onChange}
        />
        <TextFieldGroup
          placeholder="Password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.onChange}
        />
        <TextFieldGroup
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={this.state.confirmPassword}
          onChange={this.onChange}
        />
        {/* <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        /> */}
        {/* <input type="submit" className="btn btn-info btn-block mt-4" /> */}
        <button className="register__form-buttons button submit-btn">
          Sign Up
        </button>
      </form>
    );
  }

  render() {
    return (
      // <div className="register">
      //   <div className="container">
      //     <div className="row">
      //       <div className="col-md-8 m-auto">
      //         <h1 className="display-4 text-center">Sign Up</h1>
      //         <p className="lead text-center">Create your DevPals account</p>
      //         {this.props.auth.isAuthenticated && !this.props.auth.userConfirmed
      //           ? this.renderConfirmationForm()
      //           : this.renderForm()}
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="register">
        <div className="register__header">
          <h1>Sign Up</h1>
          <p className="header-label">Create your DevPals account</p>
          <div className="register__form">
            {this.props.auth.isAuthenticated && !this.props.auth.userConfirmed
              ? this.renderConfirmationForm()
              : this.renderForm()}
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  confirmUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, confirmUser }
)(withRouter(Register));
