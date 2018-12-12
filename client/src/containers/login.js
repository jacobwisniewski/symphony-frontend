import React, { Component } from "react";
import { connect } from "react-redux";
import { getUrl } from "../modules/loginActions";
import Header from "../components/header";
import styles from "./styles/login.css";

class Login extends Component {
	constructor() {
		super();
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		// If user is logged in, directly route to the equivalent component
		if (this.props.logged_in) {
			this.props.history.push("/dashboard");
		} else {
			// If user is not logged in, get the auth url and redirect
			this.props.getUrl().then(url => {
				window.location.href = url;
			});
		}
	}

	render() {
		return (
			<div className={styles.login_container}>
				<Header color={"transparent"} font_color={'hsl(0, 0%, 20%)'}/>
				<div className={styles.content_container}>
					<p className={styles.login_text}>
						Welcome to a social Spotify experience.
					</p>{" "}
					<button
						className={styles.login_button}
						name="profile"
						onClick={this.onClick}
					>
						LOGIN
					</button>
				</div>
				<p
					className={styles.login_text}
					style={{ alignSelf: "flex-end", fontSize: "15px" }}
				>
					Note: API can take a few seconds to launch, please be
					patient if long load time occurs
				</p>
			</div>
		);
	}
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
	url: state.login.url,
	loading: state.login.loading,
	error: state.login.error,
	logged_in: state.login.logged_in,
	profile: state.login,
});

const mapDispatchToProps = dispatch => ({
	// Add actions to this constant in the format
	// action: () => dispatch(action())
	getUrl: action => dispatch(getUrl(action)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Login);
