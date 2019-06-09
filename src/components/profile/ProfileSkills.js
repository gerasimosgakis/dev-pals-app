import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/isEmpty";

class ProfileSkills extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile[0].name.trim().split(" ")[0];

    // Skill List
    const skills = profile[0].skills.map((skill, index) => (
      <div key={index} className="profile-skills__content-skills-skill">
        <span className="profile-skills__content-skills-skill--bordered">
          {skill}
        </span>
      </div>
    ));

    return (
      // <div className="row">
      //   <div className="col-md-12">
      //     <div className="card card-body bg-light mb-3">
      //       <h3 className="text-center text-info">{firstName}'s Bio</h3>
      // <p className="lead">
      //   {isEmpty(profile[0].bio) ? (
      //     <span>{firstName} does not have a bio</span>
      //   ) : (
      //     <span>{profile[0].bio}</span>
      //   )}
      // </p>
      // <hr />
      //       <h3 className="text-center text-info">Skill Set</h3>
      //       <div className="row">
      //         <div className="d-flex flex-wrap justify-content-center align-items-center">
      //           {skills}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="profile-skills contain">
        <h3>Skills</h3>
        <div className="profile-skills__content">
          <div className="profile-skills__content-icon">
            <i class="fas fa-tools fa-3x" />
          </div>
          {isEmpty(profile[0].skills) ? (
            <span>{firstName} hasn't yet added any skills</span>
          ) : (
            <div className="profile-skills__content-skills">{skills}</div>
          )}
        </div>
      </div>
    );
  }
}

ProfileSkills.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileSkills;
