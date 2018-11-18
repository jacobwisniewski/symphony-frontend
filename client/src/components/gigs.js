import React, { Component } from "react";
import { connect } from "react-redux";

class Gig extends Component {
  render() {
    let playlist_url = `https://open.spotify.com/playlist/${
      this.props.gig_data.playlist_id
    }`;
    return (
      <div>
        <div>Gig name: {this.props.gig_data.gig_name}</div>
        <div>Invite code: {this.props.gig_data.invite_code}</div>
        <div>Gig owner: {this.props.gig_data.owner_name}</div>
        <a href={playlist_url}>Playlist url</a>
      </div>
    );
  }
}

class Gigs extends Component {
  componentDidMount() {
    console.log(this.props.user_gigs);
  }
  render() {
    const { user_gigs } = this.props;
    return (
      <div>
        {user_gigs.map(gig => (
          <div>
            <Gig key={gig.gig_id} gig_data={gig} />
            <br />
          </div>
        ))}
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  user_gigs: state.profile.user_gigs
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gigs);
