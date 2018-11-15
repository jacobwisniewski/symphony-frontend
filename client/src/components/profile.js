import React, { Component } from "react";
import { connect } from 'react-redux'
import { getProfile } from '../modules/profileActions'

class Profile extends Component {
  componentDidMount() {
  }
  render() {
    const { loading, spotify_id, profile_picture } = this.props
    if (loading) {
      return ( <p>Loading...</p>)
    }
    return (
      <div>
        <p>Spotify ID: {spotify_id}</p>
        <img src={profile_picture} alt={"profile"} />
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  loading: state.profile.loading,
  spotify_id: state.profile.spotify_id,
  mongo_id: state.profile.mongo_id,
  profile_picture: state.profile.profile_picture,
  access_code: state.callback.access_code
})

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  getProfile: (access_code) => dispatch(getProfile(access_code))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
