import React, { Component } from "react";

class Profile extends Component {
  componentDidMount() {
      // If not logged in prompt login
    if (!this.props.location.state) {
      const url = "http://localhost:5000/api/callback";
      fetch(url)
        .then(response => response.json())
        .then(data => {
          window.location = data.url
        });
    }
  }
  render() {
    if (this.props.location.state) {
      const data = this.props.location.state.data;
      return (
        <div>
          <div>{data.user_name}</div>
          <div>{data.spotify_id}</div>
          <a href="/">Logout</a>
          <img src={data.profile_picture} alt="profile" />
        </div>
      );
    } else {
      // No user credentials
      return null
    }
  }
}

export default Profile;
