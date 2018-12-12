import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
	getDash,
	createGig,
	toggleGigs,
	getGigs,
} from "../modules/dashActions";
import styles from "./styles/create.css";
import GoogleMapReact from "google-map-react";
import Switch from "react-switch";

class UserLocation extends Component {
	render() {
		return <div className={styles.user_location_icon} />;
	}
}

class Create extends Component {
	constructor() {
		super();
		this.state = {
			geo_enabled: false,
			latitude: null,
			longitude: null,
			gig_name: "",
			discoverable: false,
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
				geo_enabled: false,
			});
		}
	}

	setPosition(position) {
		// TODO: Add geolocation error handling
		this.setState({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
			geo_enabled: true,
		});
	}

	onChange(event) {
		var { name, value } = event.target;
		// Changes the value to true and false if checkbox is changed
		if (event.target.type === "checkbox") {
			value = event.target.checked;
		}
		this.setState({
			[name]: value,
		});
	}

	createGig() {
		// Getting variables from props and state
		const { gig_name, discoverable, latitude, longitude } = this.state;
		const { api_key, toggleGigs } = this.props;

		// Create gig data
		const gig_data = {
			api_key: api_key,
			gig_name: gig_name,
			private: !discoverable, // Get the opposite of this variable
			latitude: latitude,
			longitude: longitude,
		};
		// This chain first creates a gig, waits till its created, refreshes profile data and then
		// toggles the view to gigs
		this.props.createGig(gig_data).then(response => {
			if (!response.ok) {
				alert(response.message);
			} else {
				toggleGigs();
			}
		});
	}

	render() {
		const {
			geo_enabled,
			gig_name,
			longitude,
			latitude,
			discoverable,
		} = this.state;
		const center = { lat: latitude, lng: longitude };
		const API_KEY = process.env.REACT_APP_GOOGLE_API;
		return (
			<div className={styles.create_container}>
				<div>
					<p
						className={styles.create_component_text}
						style={{ marginTop: "10px", fontSize: "25px" }}
					>
						Create a new gig{" "}
					</p>
					<div className={styles.invite_code_container}>
						<input
							className={styles.input_box}
							name="gig_name"
							type="text"
							onChange={this.onChange}
							spellCheck={false}
							placeholder={"Gig name"}
							maxLength={32}
						/>
						<div className={styles.toggle_container}>
							<p className={styles.create_component_text}>
								Discoverable
							</p>
							<label
								htmlFor="normal-switch"
								style={{ marginTop: "6px", marginLeft: "5px" }}
							>
								<Switch
									checked={discoverable}
									onChange={() =>
										this.setState({
											discoverable: !discoverable,
										})
									}
									disabled={!geo_enabled}
									checkedIcon={false}
									height={23}
									width={45}
									uncheckedIcon={false}
									onColor={"#1db954"}
								/>
							</label>
						</div>
						<div className={styles.button_container}>
							<button
								className={styles.create_button}
								disabled={gig_name.length === 0}
								onClick={() => this.createGig()}
							>
								Create
							</button>
						</div>
					</div>
				</div>

				{geo_enabled && (
					<div style={{ height: "calc(100vh - 182px - 53px - 56px", width: "100vw" }}>
						<GoogleMapReact
							bootstrapURLKeys={{
								key: API_KEY,
							}}
							options={{
								zoomControl: false,
								fullscreenControl: false,
								gestureHandling: "none",
								panControl: false,
								mapTypeControl: false,
								scrollwheel: false,
							}}
							defaultCenter={center}
							defaultZoom={15}
						>
							<UserLocation
								color={"blue"}
								width={"20px"}
								height={"20px"}
								center={center}
							/>
						</GoogleMapReact>
					</div>
				)}
			</div>
		);
	}
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
	api_key: state.dash.profile.api_key,
});

const mapDispatchToProps = dispatch => ({
	// Add actions to this constant in the format
	// action: () => dispatch(action())
	createGig: gig_data => dispatch(createGig(gig_data)),
	toggleGigs: () => dispatch(toggleGigs()),
	getDash: (access_code, api_key) => dispatch(getDash(access_code, api_key)),
	getGigs: api_key => dispatch(getGigs(api_key)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(Create));
