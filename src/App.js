import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Provider } from "react-redux";
import store from "./redux/store";

import "./App.scss";
import Routes from "./Routes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Spinner from "./components/common/Spinner";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession(); // Gets the current session
      this.userHasAuthenticated(true); // If the above succeeds it calls userHasAuthenticated function
    } catch (err) {
      if (err !== "No current user") {
        alert(err);
      }
    }

    this.setState({ isAuthenticating: false });
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
      this.state.isAuthenticating && <Spinner />,
      !this.state.isAuthenticating && (
        <Provider store={store}>
          <div className="App">
            <Navbar
              isAuthenticated={this.state.isAuthenticated}
              onAuthChange={this.userHasAuthenticated}
            />
            <div class="main-content">
              <Routes childProps={childProps} />
            </div>
            <Footer />
          </div>
        </Provider>
      )
    );
  }
}

export default App;
