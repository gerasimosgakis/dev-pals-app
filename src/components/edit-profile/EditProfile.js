import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import {
  createProfile,
  getCurrentProfile
} from "../../redux/actions/profileActions";
import isEmpty from "../../validation/isEmpty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      social: {},
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      expData: this.props.profile.profile[0].expData, // retrieve data from redux so they will not be overwritten with empty
      eduData: this.props.profile.profile[0].eduData,
      errors: {}
    };
  }

  componentDidMount() {
    console.log(this.state);
    const currentUserId = this.props.auth.user.username;
    this.props.getCurrentProfile(currentUserId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile[0]) {
      const profile = nextProps.profile.profile[0];
      console.log(nextProps);

      // Bring skills array back to CSV
      //const skillsCSV = profile.skills.join(",");

      // if profile doesn't exist make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.twitter) ? profile.twitter : "";
      profile.youtube = !isEmpty(profile.youtube) ? profile.youtube : "";
      profile.instagram = !isEmpty(profile.instagram) ? profile.instagram : "";
      profile.facebook = !isEmpty(profile.facebook) ? profile.facebook : "";
      profile.linkedin = !isEmpty(profile.linkedin) ? profile.linkedin : "";

      // Set component fields state
      this.setState({
        handle: profile.handle ? profile.handle : "",
        company: profile.company ? profile.company : "",
        website: profile.website ? profile.website : "",
        location: profile.location ? profile.location : "",
        status: profile.status ? profile.status : "",
        skills: profile.skills ? profile.skills : [],
        githubusername: profile.githubusername ? profile.githubusername : "",
        bio: profile.bio ? profile.bio : "",
        twitter: profile.twitter ? profile.twitter : "",
        facebook: profile.facebook ? profile.facebook : "",
        linkedin: profile.linkedin ? profile.linkedin : "",
        youtube: profile.youtube ? profile.youtube : "",
        instagram: profile.instagram ? profile.instagram : ""
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(this.props.profile.profile[0].eduData);
    const profileData = {
      userId: this.props.auth.user.username,
      handle: this.state.handle,
      name: this.props.auth.user.attributes.name,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
      expData: this.state.expData,
      eduData: this.props.profile.profile[0].eduData
    };

    const currentUserId = this.props.auth.user.username;
    const email = this.props.auth.user.attributes.email;

    this.props.createProfile(
      currentUserId,
      email,
      profileData,
      this.props.history
    );
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile Url"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Facebook Profile Url"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Linkedin Profile Url"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Youtube Profile Url"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
          />
          <InputGroup
            placeholder="Instagram Profile Url"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student / Learning", value: "Student / Learning" },
      { label: "Instructor / Teacher", value: "Instructor / Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  info="A unique handle for your profile URL. Your full name, company name. nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  options={options}
                  onChange={this.onChange}
                  info="Where are you at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  info="Your own company or the one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  info="Your website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  info="Your location (e.g. London, UK)"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  info="Please use comma separated values (e.g. Javascript,Angular,React)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  info="If you want your latest repos and a Github link include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  info="Let us know a little more about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: state.auth,
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
