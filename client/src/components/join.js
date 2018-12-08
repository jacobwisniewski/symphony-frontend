import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { joinGig, getDash, toggleGigs, findGigs } from "../modules/dashActions";

class Gig extends Component {
  constructor() {
    super()
    this.joinGig = this.joinGig.bind(this);
  }

  joinGig(invite_code, api_key) {
    // Joins the gig
    this.props.joinGig(api_key, invite_code).then(response => {
      if (!response) {
        // Alerts the user that the invite code was not valid
        alert("That invite code is not valid.");
      } else {
        // If the invite code is valid, get the updated profile data and
        // toggle gigs component
        this.props.getDash(null, api_key);
        this.props.toggleGigs();
      }
    });
  }
  render() {
    return (
      <div>
        <div>
          <div>{this.props.data.name}</div>
          <div>{this.props.data.owner_name}</div>
          <button
            onClick={() =>
              this.joinGig(this.props.data.invite_code, this.props.api_key)
            }
          >
            Join
          </button>
        </div>
      </div>
    );
  }
}

class NearbyGigs extends Component {
  constructor() {
    super();
    this.state = {
      geo_enabled: false,
      latitude: null,
      longitude: null,
      invite_code: ""
    };

    this.setPosition = this.setPosition.bind(this);
  }

  componentWillMount() {
    // Handles the geolocation aspect
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setPosition);
    } else {
      // Change geo_enabled to false
      this.setState({
        geo_enabled: false
      });
    }
  }

  setPosition(position) {
    // TODO: Add geolocation error handling
    // Sets the position and also finds the gigs with the new data
    // This is a bit hacky but thats alright :)
    this.setState(
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        geo_enabled: true
      },
      () =>
        this.props.findGigs(
          this.props.api_key,
          this.state.latitude,
          this.state.longitude
        )
    );
  }

  render() {
    // Add a no latitude or location component
    // Add a loading component
    const { data } = this.props;
    if (data === null) {
      return <p>Loading...</p>;
    } else {
      const nearby_gigs = this.props.data.map(gig => (
        <Gig
          key={gig.playlist_id}
          api_key={this.props.api_key}
          data={gig}
          joinGig={this.props.joinGig}
          getDash={this.props.getDash}
          toggleGigs={this.props.toggleGigs}
        />
      ));
      return nearby_gigs;
    }
  }
}

class Join extends Component {
  constructor() {
    super();
    this.state = {
      geo_enabled: false,
      latitude: null,
      longitude: null,
      invite_code: ""
    };

    this.onChange = this.onChange.bind(this);
    this.joinGig = this.joinGig.bind(this);
  }

  onChange(event) {
    var { name, value } = event.target;
    // Changes the value to true and false if checkbox is changed
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    }
    this.setState({
      [name]: value
    });
  }

  joinGig(invite_code, api_key) {
    // Joins the gig
    this.props.joinGig(api_key, invite_code).then(response => {
      if (!response) {
        // Alerts the user that the invite code was not valid
        alert("That invite code is not valid.");
      } else {
        // If the invite code is valid, get the updated profile data and
        // toggle gigs component
        this.props.getDash(null, api_key);
        this.props.toggleGigs();
      }
    });
  }

  render() {
    return (
      <div>
        <div>Enter a invite code or select a gig!</div>
        <div>
          Invite code:
          <input name="invite_code" type="text" onChange={this.onChange} />
        </div>
        <div>
          <button
            disabled={this.state.invite_code.length !== 6}
            onClick={() => this.joinGig(this.state.invite_code)}
          >
            Join
          </button>
        </div>
        <div>-----------------</div>
        <div>
          <NearbyGigs
            data={this.props.nearby_gigs}
            api_key={this.props.api_key}
            join_gig={this.onClick}
            joinGig={this.props.joinGig}
            findGigs={this.props.findGigs}
            getDash={this.props.getDash}
            toggleGigs={this.props.toggleGigs}
          />
        </div>
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  api_key: state.dash.profile.api_key,
  nearby_gigs: state.dash.nearby_gigs,
  find_loading: state.dash.find_loading
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  joinGig: (api_key, invite_code) => dispatch(joinGig(api_key, invite_code)),
  getDash: (access_code, api_key) => dispatch(getDash(access_code, api_key)),
  toggleGigs: () => dispatch(toggleGigs()),
  findGigs: (api_key, latitude, longitude) =>
    dispatch(findGigs(api_key, latitude, longitude))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Join));
