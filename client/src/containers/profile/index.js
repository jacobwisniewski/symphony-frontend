import React, { Component } from "react";
import { connect } from 'react-redux'
import { getProfile } from '../../modules/profileActions'

class Profile extends Component {
  componentDidMount() {
    // Checks if profile is being requested from callback
    if (!this.props.loading) {
    this.props.getProfile(this.props.mongo_id)
    }
  }
  render() {
    const { spotify_id, profile_picture } = this.props
    // Only returns a loading screen if spotify_id is null
    if (spotify_id === null) {
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
})

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  getProfile: (mongo_id) => dispatch(getProfile(mongo_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
