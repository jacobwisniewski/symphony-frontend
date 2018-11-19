import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleGigs } from "../modules/navbarActions";
import { refreshProfile, createGig } from "../modules/profileActions";
import GoogleMapReact from "google-map-react";

// Some general notes include the use of the excellent google-map-react, source of which is
// https://github.com/google-map-react/google-map-react

class Marker extends Component {
  render() {
    return <div style={{
      width: '50px',
      height: '50px',
      '-webkit-border-radius': '25px',
      '-moz-border-radius': '25px',
      'border-radius': '25px',
      background: 'red',
      opacity: 0.5
    }}></div>;
  }
}

class Map extends Component {
  render() {
    return (
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAvX6atjPafAb_chcaNFhqb-HL_qq9JJE8" }}
          defaultCenter={this.props.coords}
          defaultZoom={15}
          options={{
            disableDefaultUI: true,
            gestureHandling: "none",
            draggableCursor: "default"
          }}
        >
          <Marker lat={this.props.latitude} lng={this.props.longitude} />
        </GoogleMapReact>
      </div>
    );
  }
}

class Create extends Component {
  constructor() {
    super();
    this.state = {
      gig_name: "",
      private: false,
      location: false,
      latitude: null,
      longitude: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setPosition = this.setPosition.bind(this);
  }

  componentDidMount() {
    // Asks the user for geolocation, if user allows then calls setPosition
    navigator.geolocation.getCurrentPosition(this.setPosition);
  }

  setPosition(position) {
    // Sets the latitude and longitude, also enables use of the private checkbox
    this.setState({
      location: true,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }

  handleChange(event) {
    // When the gig_name input or the private checkbox is changed the state is updated accordingly
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // When submit button is clicked, create a new gig and toggle gigs page
    this.props
      .createGig(this.props.mongo_id, this.state.gig_name, this.state.private)
      .then(() => {
        // Requests for new profile data (including the new gig)
        this.props.refreshProfile(this.props.mongo_id).then(() => {
          // Toggles gigs page
          this.props.toggleGigs();
        });
      });
    event.preventDefault();
  }

  render() {
    return (
      <div style={{'margin-top': '40px'}}>
        <div>
          Gig name
          <input
            name="gig_name"
            type="text"
            value={this.state.gig_name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          Public
          <input
            name="private"
            type="checkbox"
            checked={this.state.private}
            onChange={this.handleChange}
            disabled={!this.state.location}
          />
        </div>
        <Map
          coords={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}
        />
        <div>
          <button onClick={this.handleSubmit}>Create</button>
        </div>
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  mongo_id: state.profile.mongo_id
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  toggleGigs: () => dispatch(toggleGigs()),
  refreshProfile: mongo_id => dispatch(refreshProfile(mongo_id)),
  createGig: (mongo_id, gig_name, discoverable) =>
    dispatch(createGig(mongo_id, gig_name, discoverable))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
