import React, { Component } from "react";
import { Auth, AmazonCognitoIdentity } from "aws-amplify";
import { Provider } from "react-redux";
import store from "./store";
import config from "./config";

import "./App.scss";
import Routes from "./Routes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// import ChatMessage from "./components/chat/ChatMessage";
// import Signup from "./components/chat/Signup";
// import ChatApp from "./components/chat/ChatApp";

// import { default as Chatkit } from "@pusher/chatkit-server";

// const chatkit = new Chatkit({
//   instanceLocator: "v1:us1:e98f7e4e-6aa0-4ef1-bdf8-13985777b3c9",
//   key:
//     "5732bbaa-37d5-4189-96ad-95afd9468045:dMEliWkgzQ066cFITrrEcjzyfrHDi8oREepcnlpH1jE="
// });

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
      await Auth.currentSession();
      this.userHasAuthenticated(true);
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
    // let view = "";
    // if (this.state.currentView === "ChatMessage") {
    //   view = <ChatMessage changeView={this.changeView} />;
    // } else if (this.state.currentView === "signup") {
    //   view = <Signup onSubmit={this.createUser} />;
    // } else if (this.state.currentView === "chatApp") {
    //   view = <ChatApp currentId={this.state.currentId} />;
    // }
    return (
      !this.state.isAuthenticating && (
        <Provider store={store}>
          <div className="App">
            <Navbar
              isAuthenticated={this.state.isAuthenticated}
              onAuthChange={this.userHasAuthenticated}
            />
            <div className="container">
              {/* <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} /> */}
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
