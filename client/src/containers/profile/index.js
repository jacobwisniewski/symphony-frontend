import React, { Component } from "react";

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
      return <div>Loading...</div>;
    }
  }
}

export default Profile;
