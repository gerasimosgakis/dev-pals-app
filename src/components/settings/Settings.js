import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import { s3Upload } from "../../libs/awsLib";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: false,
      content: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.file = e.target.files[0];
    console.log(this.file);
  };

  onAddPic = async e => {
    e.preventDefault();
    console.log(this.state.profilePic);
    this.setState({ isLoading: true });

    try {
      const attachment = this.file ? await s3Upload(this.file) : null;
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className="profile-pic-form">
        <form onSubmit={this.onAddPic}>
          <TextFieldGroup
            placeholder="Choose a file"
            name="profilePic"
            type="file"
            value={this.state.profilePic}
            onChange={this.onChange}
          />
          <button className="button submit-btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default Settings;
