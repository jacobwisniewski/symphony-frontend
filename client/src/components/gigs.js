import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { leaveGig, getDash, getGigs } from "../modules/dashActions";

class GigInfo extends Component {
	constructor() {
		super();

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		// Leaves the gig
		this.props.leaveGig(this.props.api_key, this.props.data.invite_code);
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
						<a href={this.props.data.playlist_url}>
							Open in Spotify
						</a>
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
			toggle_info: false,
		};

		this.toggleInfo = this.toggleInfo.bind(this);
	}

	toggleInfo() {
		this.setState({
			toggle_info: !this.state.toggle_info,
		});
	}

	render() {
		const { name, owner_name } = this.props.gig_data;
		const { gig_data, api_key, leaveGig, getDash } = this.props;
		return (
			<div>
				<div>
					<div>
						<div>{name}</div>
						<div>{owner_name}</div>
					</div>
					<div>
						<button onClick={() => this.toggleInfo()}>
							Extend
						</button>
					</div>
				</div>
				{this.state.toggle_info && (
					<GigInfo
						api_key={api_key}
						data={gig_data}
						leaveGig={leaveGig}
						getDash={getDash}
					/>
				)}
			</div>
		);
	}
}

class Gigs extends Component {
	componentDidMount() {
		this.props.getGigs(this.props.api_key);
	}

	render() {
		const { gigs, loading, leaveGig, getDash, api_key } = this.props;
		if (loading || gigs == null) {
			return <p>Loading...</p>;
		} else if (gigs.length === 0) {
			return <p>You're in no gigs, join or create one!</p>;
		} else {
			const gig_list = gigs.map(gig_data => (
				<Gig
					key={gig_data.playlist_id}
					gig_data={gig_data}
					leaveGig={leaveGig}
					getDash={getDash}
					api_key={api_key}
				/>
			));
			return gig_list;
		}
	}
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
	gigs: state.dash.gigs,
	api_key: state.dash.profile.api_key,
	loading: state.dash.gigs_loading,
	prev_path: state.dash.prev_path,
});

const mapDispatchToProps = dispatch => ({
	// Add actions to this constant in the format
	// action: () => dispatch(action())
	leaveGig: (api_key, invite_code) =>
		dispatch(leaveGig(api_key, invite_code)),
	getDash: (access_code, api_key) => dispatch(getDash(access_code, api_key)),
	getGigs: api_key => dispatch(getGigs(api_key)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(Gigs));
