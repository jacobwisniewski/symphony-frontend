import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { leaveGig, getDash } from "../modules/dashActions";

class GigInfo extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    // Leaves the gig and then refreshs the dash data
    this.props
      .leaveGig(this.props.api_key, this.props.data.invite_code)
      .then(() => this.props.getDash(null, this.props.api_key));
  }

  render() {
    return (
      <div>
        <div>Invite code: {this.props.data.invite_code}</div>
        <div>
          <div>
            <button onClick={() => this.onClick()}>Leave</button>
          </div>
          <div>
            <a href={this.props.data.playlist_url}>Open in Spotify</a>
          </div>
        </div>
      </div>
    );
  }
}

class Gig extends Component {
  constructor() {
    super();
    this.state = {
      toggle_info: false
    };

    this.toggleInfo = this.toggleInfo.bind(this);
  }

  toggleInfo() {
    this.setState({
      toggle_info: !this.state.toggle_info
    });
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <div>{this.props.data.name}</div>
            <div>{this.props.data.owner_name}</div>
          </div>
          <div>
            <button onClick={() => this.toggleInfo()}>Extend</button>
          </div>
        </div>
        {this.state.toggle_info && (
          <GigInfo
            data={this.props.data}
            leaveGig={this.props.leaveGig}
            getDash={this.props.getDash}
            api_key={this.props.api_key}
          />
        )}
      </div>
    );
  }
}

class Gigs extends Component {
  render() {
    const { gigs, loading } = this.props;
    if (loading || gigs === null) {
      return null
    } else {
      const gig_list = gigs.map(gig_data => (
        <Gig
          key={gig_data.playlist_id}
          data={gig_data}
          leaveGig={this.props.leaveGig}
          getDash={this.props.getDash}
          api_key={this.props.api_key}
        />
      ));
      return gig_list;
    }
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  gigs: state.dash.profile.gigs,
  api_key: state.dash.profile.api_key,
  loading: state.dash.loading
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  leaveGig: (api_key, invite_code) => dispatch(leaveGig(api_key, invite_code)),
  getDash: (access_code, api_key) => dispatch(getDash(access_code, api_key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Gigs));
