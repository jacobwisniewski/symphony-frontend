import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Profile extends Component {
  render() {
    if (this.props.location.state) {
      const data = this.props.location.state.data;
      return (
        <div>
          <div>{data.user_name}</div>
          <div>{data.spotify_id}</div>
          <img src={data.profile_picture} alt="profile" />
        </div>
      );
    } else {
        // No user credentials
        return <Redirect to="/" />
    }
  }
}

export default Profile;
