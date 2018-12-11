import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
	joinGig,
	getDash,
	toggleGigs,
	findGigs,
	getGigs,
} from "../modules/dashActions";
import styles from "./styles/join.css";

class Gig extends Component {
	render() {
		// Set the variables of all the data/functions from props
		const { name, owner_name, invite_code } = this.props.gig_data;
		const { api_key, joinGig } = this.props;

		return (
			// Nearby gig component division
			<div className={styles.gig_container}>
				<div className={styles.text_container}>
					{/* Gig name and owner name division */}
					<div className={styles.gig_name_text}>{name}</div>
					<div className={styles.owner_name_text}>{owner_name}</div>
				</div>
				<div>
					{/* Gig join button division */}
					<button
						className={styles.join_button}
						onClick={() => joinGig(api_key, invite_code)}
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
			invite_code: "",
		};

		this.setPosition = this.setPosition.bind(this);
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
		// Sets the position and also finds the gigs with the new data
		this.setState(
			{
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				geo_enabled: true,
			},
			// Call the backend for nearby gigs
			() =>
				this.props.findGigs(
					this.props.api_key,
					this.state.latitude,
					this.state.longitude,
				),
		);
	}

	render() {
		// Add a no latitude or location component
		// Add a loading component
		const {
			nearby_gigs,
			api_key,
			joinGig,
			getDash,
			toggleGigs,
			find_loading,
		} = this.props;
		const { geo_enabled } = this.state;
		if (find_loading || nearby_gigs == null) {
			// When the backend is being called for nearby gigs
			return null;
		} else if (!geo_enabled) {
			// When the user does not enable location
			return (
				<div className={styles.error_container}>
					<p className={styles.join_component_text}>
						Join a nearby gig
					</p>
					<p className={styles.error_text}>
						Enable location services to discover gigs near you
					</p>
				</div>
			);
		} else if (nearby_gigs.length === 0) {
			// When there are no nearby gigs after a find call
			return (
				<div className={styles.error_container}>
					<p className={styles.join_component_text}>
						Join a nearby gig
					</p>
					<p className={styles.error_text}>No gigs nearby :(</p>
				</div>
			);
		} else {
			// Returns all the nearby gigs
			const gig_list = this.props.nearby_gigs.map(gig_data => (
				<Gig
					key={gig_data.playlist_id}
					api_key={api_key}
					gig_data={gig_data}
					joinGig={joinGig}
					getDash={getDash}
					toggleGigs={toggleGigs}
				/>
			));
			return (
				<div className={styles.nearby_gigs_container}>
					<p className={styles.join_component_text}>
						Join a nearby gig
					</p>
					<div className={styles.gigs_list}>{gig_list}</div>
				</div>
			);
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
			invite_code: "",
		};

		this.onChange = this.onChange.bind(this);
		this.joinGig = this.joinGig.bind(this);
	}

	onChange(event) {
		// Handles the input box
		var { name, value } = event.target;
		// Changes the value to true and false if checkbox is changed
		if (event.target.type === "checkbox") {
			value = event.target.checked;
		}
		this.setState({
			[name]: value,
		});
	}

	joinGig(api_key, invite_code) {
		// Joins the gig
		this.props.joinGig(api_key, invite_code).then(response => {
			if (!response.ok) {
				// Alerts the user that the invite code was not valid
				alert(response.message);
			} else {
				// If the invite code is valid, get the updated profile data and
				// toggle gigs component
				this.props.getGigs(api_key);
				this.props.toggleGigs();
			}
		});
	}

	render() {
		const {
			nearby_gigs,
			find_loading,
			api_key,
			findGigs,
			getDash,
			toggleGigs,
		} = this.props;
		const { invite_code } = this.state;

		return (
			<div className={styles.join_container}>
				<div className={styles.invite_code_container}>
					<p className={styles.join_component_text}>
						Enter an invite code
					</p>
					<div className={styles.input_container}>
						<input
							className={styles.input_box}
							name="invite_code"
							type="text"
							onChange={this.onChange}
							spellCheck={false}
						/>
						<button
							className={styles.input_button}
							disabled={this.state.invite_code.length !== 6}
							onClick={() => this.joinGig(api_key, invite_code)}
						>
							Join
						</button>
					</div>
				</div>
				<div>
					<hr className={styles.horizontal_lines} />
					<p className={styles.join_component_text}>or</p>
					<hr className={styles.horizontal_lines} />
				</div>
				<NearbyGigs
					nearby_gigs={nearby_gigs}
					find_loading={find_loading}
					api_key={api_key}
					joinGig={this.joinGig}
					findGigs={findGigs}
					getDash={getDash}
					toggleGigs={toggleGigs}
				/>
			</div>
		);
	}
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
	api_key: state.dash.profile.api_key,
	nearby_gigs: state.dash.nearby_gigs,
	find_loading: state.dash.find_loading,
});

const mapDispatchToProps = dispatch => ({
	// Add actions to this constant in the format
	// action: () => dispatch(action())
	joinGig: (api_key, invite_code) => dispatch(joinGig(api_key, invite_code)),
	getDash: (access_code, api_key) => dispatch(getDash(access_code, api_key)),
	toggleGigs: () => dispatch(toggleGigs()),
	findGigs: (api_key, latitude, longitude) =>
		dispatch(findGigs(api_key, latitude, longitude)),
	getGigs: api_key => dispatch(getGigs(api_key)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(Join));
