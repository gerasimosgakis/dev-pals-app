import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.scss";
import Routes from "./Routes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <div className="container">
          {/* <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} /> */}
          <Routes />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
