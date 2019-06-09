import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import logo from "../../logo_transparent.png";
import { connect } from "react-redux";
import { loginSavedUser } from "../../actions/authActions";
class Landing extends Component {
  componentDidMount() {
    this.props.loginSavedUser();
  }
  render() {
    return (
      // <div className="landing">
      //   <div className="dark-overlay landing-inner text-light">
      //     <div className="container">
      //       <div className="row">
      //         <div className="col-md-12 text-center">
      //           <img src={logo} alt="logo" />
      //           <p className="lead">
      //             {" "}
      //             Create a developer profile/portfolio, share posts and get help
      //             from other developers
      //           </p>
      //           <Link to="/register" className="btn btn-lg btn-info mr-2">
      //             Sign Up
      //           </Link>
      //           <Link to="/login" className="btn btn-lg btn-light">
      //             Login
      //           </Link>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="landing">
        <div className="landing__logo">
          <img src={logo} alt="logo" className="landing__logo-image" />
        </div>
        <div className="landing__slogan mt-4">
          <p className="landing__slogan-text lead-text">
            Meet other developers, code together, get better
          </p>
          {/* <Link to="/register" className="btn btn-lg btn-info mr-2">
            Sign Up
          </Link> */}
          {this.props.auth.isAuthenticated ? (
            <Link to="/dashboard">
              <button className="button submit-btn">Go to Dashboard</button>
            </Link>
          ) : (
            <Fragment>
              <Link to="/register">
                <button className="button submit-btn mr1">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="button back-btn">Login</button>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginSavedUser }
)(withRouter(Landing));
