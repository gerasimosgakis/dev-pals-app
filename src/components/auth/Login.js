import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillMount() {
    this.props.clearErrors();
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async e => {
    console.log(this.props.errors.errors);
    e.preventDefault();
    // try {
    //   await Auth.signIn(this.state.email, this.state.password);
    //   // alert("Logged in");
    //   this.props.userHasAuthenticated(true);
    //   this.props.history.push("/");
    // } catch (err) {
    //   alert(err.message);
    // }
    this.setState({ isLoading: true });

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user, this.props.history);
  };

  render() {
    const { errors } = this.props.errors;
    return (
      // <div className="login">
      //   <div className="container">
      //     <div className="row">
      //       <div className="col-md-8 m-auto">
      //         <h1 className="display-4 text-center">Log In</h1>
      //         <p className="lead text-center">
      //           Sign in to your DevPals account
      //         </p>
      //         <form onSubmit={this.onSubmit}>
      //           <TextFieldGroup
      //             placeholder="Email Address"
      //             name="email"
      //             type="email"
      //             value={this.state.email}
      //             onChange={this.onChange}
      //             required
      //           />
      //           <TextFieldGroup
      //             placeholder="Password"
      //             name="password"
      //             type="password"
      //             value={this.state.password}
      //             onChange={this.onChange}
      //             required
      //             error={errors.message}
      //           />
      //           <input type="submit" className="btn btn-info btn-block mt-4" />
      //         </form>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="login">
        <div className="login__header">
          <h1>Log In</h1>
          <p className="header-label">Sign in to your DevPals account</p>
        </div>
        <div className="login__form">
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              required
            />
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              required
              error={errors.message}
            />
            <button className="login__form-buttons button submit-btn">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(withRouter(Login));
