import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { leaveGig, getDash, getGigs } from "../modules/dashActions";
import { ReactComponent as ArrowIcon } from "./icons/angle-down-solid.svg";
import { ReactComponent as SpotifyIcon } from "./icons/spotify-brands.svg";
import styles from "./styles/gigs.css";

class GigInfo extends Component {
	constructor() {
		super();

		this.copyCode = this.copyCode.bind(this);
	}
	copyCode(e) {
		// A function for copying the invite code to the users clipboard
		this.textArea.select();
		document.execCommand("copy");
	}
	render() {
		const { api_key, leaveGig } = this.props;
		const { invite_code } = this.props.data;
		return (
			<div className={styles.info_container}>
				<div className={styles.button_container}>
					<button
						className={styles.open_to_spotify_container}
						onClick={() =>
							(window.location.href = this.props.data.playlist_url)
						}
					>
						<SpotifyIcon
							color={"white"}
							width={"30px"}
							height={"30px"}
						/>
						<p className={styles.open_to_spotify_text}>
							Open in <br /> Spotify
						</p>
					</button>
					<input
						className={styles.invite_code_text}
						ref={textarea => (this.textArea = textarea)}
						onClick={this.copyCode}
						value={invite_code}
						spellCheck={false}
						readOnly={true}
					/>
					<div>
						<button
							className={styles.leave_gig_button}
							onClick={() => leaveGig(api_key, invite_code)}
						>
							Leave
						</button>
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
		const { toggle_info } = this.state;
		return (
			<div>
				<div
					className={styles.gig_container}
					onClick={() => this.toggleInfo()}
				>
					<div className={styles.text_container}>
						<p className={styles.gig_name_text}>{name}</p>
						<p className={styles.owner_name_text}>{owner_name}</p>
					</div>
					<div>
						<ArrowIcon
							transform={!toggle_info ? "rotate(90)" : ""}
							color={"white"}
							width={"30px"}
							height={"30px"}
						/>
					</div>
				</div>
				{toggle_info && (
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
			return <div className={styles.gigs_container} />;
		} else if (gigs.length === 0) {
			return (
				<div className={styles.gigs_container}>
					<p className={styles.no_gigs_text}>
						No gigs here, <br /> create or join a gig!
					</p>
				</div>
			);
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
			return <div className={styles.gigs_container}>{gig_list}</div>;
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
