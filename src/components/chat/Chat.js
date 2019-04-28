import React, { Component } from "react";
import { connect } from "react-redux";
import ChatMessage from "./ChatMessage";
import Signup from "./Signup";
import ChatApp from "./ChatApp";

import { default as Chatkit } from "../../../node_modules/@pusher/chatkit-server";

const chatkit = new Chatkit({
  instanceLocator: "v1:us1:e98f7e4e-6aa0-4ef1-bdf8-13985777b3c9",
  key:
    "5732bbaa-37d5-4189-96ad-95afd9468045:dMEliWkgzQ066cFITrrEcjzyfrHDi8oREepcnlpH1jE="
});

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUsername: "",
      currentId: "",
      currentView: "ChatMessage"
    };
  }

  createUser = username => {
    chatkit
      .createUser({
        id: username,
        name: username
      })
      .then(currentUser => {
        console.log(currentUser);
        this.setState({
          currentUsername: username,
          currentId: username,
          currentView: "chatApp"
        });
      })
      .catch(err => {
        if (err.status === 400) {
          this.setState({
            currentUsername: username,
            currentId: username,
            currentView: "chatApp"
          });
        } else {
          console.log(err.status);
        }
      });
  };

  changeView = view => {
    this.setState({
      currentView: view
    });
  };

  componentDidMount() {
    const currentUserEmail = this.props.auth.user.attributes.email;
    this.createUser(currentUserEmail.slice(0, currentUserEmail.indexOf("@")));
  }

  render() {
    let view = "";
    if (this.state.currentView === "ChatMessage") {
      view = <ChatMessage changeView={this.changeView} />;
    } else if (this.state.currentView === "signup") {
      view = <Signup onSubmit={this.createUser} />;
    } else if (this.state.currentView === "chatApp") {
      view = <ChatApp currentId={this.state.currentId} />;
    }

    return <div>{view}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Chat);
