import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getDash, createGig, toggleGigs } from "../modules/dashActions";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      geo_enabled: false,
      latitude: null,
      longitude: null,
      gig_name: "",
      discoverable: false
    };

    this.setPosition = this.setPosition.bind(this);
    this.onChange = this.onChange.bind(this);
    this.createGig = this.createGig.bind(this);
  }
  componentDidMount() {
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
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      geo_enabled: true
    });
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

  createGig() {
    const gig_data = {
      api_key: this.props.api_key,
      gig_name: this.state.gig_name,
      private: this.state.discoverable,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    // This chain first creates a gig, waits till its created, refreshes profile data and then 
    // toggles the view to gigs
    console.log(gig_data)
    this.props
      .createGig(gig_data)
      .then(() =>
        this.props
          .getDash(null, this.props.api_key)
          .then(() => this.props.toggleGigs())
      );
  }

  render() {
    return (
      <div>
        <div>
          Gig name{" "}
          <input name="gig_name" type="text" onChange={this.onChange} />
        </div>
        <div>
          Discoverable{" "}
          <input
            name="discoverable"
            type="checkbox"
            disabled={!this.state.geo_enabled}
            onChange={this.onChange}
          />
        </div>
        <div>
          <button
            disabled={this.state.gig_name.length === 0}
            onClick={() => this.createGig()}
          >
            Create
          </button>
        </div>
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  api_key: state.dash.profile.api_key
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  createGig: gig_data => dispatch(createGig(gig_data)),
  toggleGigs: () => dispatch(toggleGigs()),
  getDash: (access_code, api_key) => dispatch(getDash(access_code, api_key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Create));
