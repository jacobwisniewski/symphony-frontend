import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogout } from "../modules/loginActions";
import { withRouter } from "react-router-dom";
import { ReactComponent as LogoutIcon } from "./icons/sign-out-alt-solid.svg";
import { ReactComponent as ArrowIcons } from "./icons/angle-down-solid.svg";
import styles from "./styles/header.css";

class Profile extends Component {
	constructor() {
		super();

		this.onClickUserLogout = this.onClickUserLogout.bind(this);
	}
	onClickUserLogout() {
		// A handle for handling logging out of Symphony
		this.props.userLogout();
		this.props.history.push("/");
		this.props.onLogout();
	}

	render() {
		return (
			<div className={styles.logout_container}>
				<button
					className={styles.logout_button}
					onClick={this.onClickUserLogout}
				>
					Logout
				</button>
				<LogoutIcon color={this.props.font_color} width={"15px"} height={"15px"} />
			</div>
		);
	}
}

class Header extends Component {
	constructor() {
		super();
		this.state = {
			toggle_profile: false,
		};

		this.toggleProfile = this.toggleProfile.bind(this);
	}

	toggleProfile() {
		this.setState({
			toggle_profile: !this.state.toggle_profile,
		});
	}

	render() {
		const {
			name,
			profile_picture,
			userLogout,
			history,
			color,
			font_color,
		} = this.props;
		const { toggle_profile } = this.state;
		return (
			<div
				style={{
					backgroundColor:
						color === "transparent"
							? "transparent"
							: "hsl(0, 0%, 20%)",
					color:
						font_color === "hsl(0, 0%, 20%)"
							? "hsl(0, 0%, 20%)"
							: "hsl(0, 0%, 100%)",
				}}
			>
				<div
					className={styles.header_container}
					style={{ backgroundColor: color, color: font_color }}
				>
					<b
						className={styles.header_title}
						onClick={() => this.props.history.push("/")}
						style={{ fontColor: font_color }}
					>
						♫ Symphony
					</b>
					{/* Only display the profile container when name is not null */}
					{name !== null && (
						<div
							className={styles.profile_container}
							onClick={this.toggleProfile}
						>
							<img
								className={styles.profile_image}
								src={profile_picture}
								width={"30px"}
								height={"30px"}
							/>
							<b className={styles.profile_name}>
								{name.split(" ")[0]}
							</b>
							<ArrowIcons
								transform={toggle_profile ? "rotate(180)" : ""}
								className={styles.profile_arrow}
								color={font_color}
								width={"15px"}
								height={"15px"}
							/>
						</div>
					)}
				</div>
				{toggle_profile && (
					<Profile
						userLogout={userLogout}
						history={history}
						onLogout={this.toggleProfile}
						font_color={font_color}
					/>
				)}
			</div>
		);
	}
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
	name: state.dash.profile.name,
	profile_picture: state.dash.profile.profile_picture,
});

const mapDispatchToProps = dispatch => ({
	// Add actions to this constant in the format
	// action: () => dispatch(action())
	userLogout: () => dispatch(userLogout()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(Header));
