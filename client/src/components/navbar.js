import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleCreate, toggleJoin, toggleGigs } from "../modules/dashActions";
import styles from "./styles/navbar.css";
import { ReactComponent as CreateIcon } from "./icons/edit-regular.svg";
import { ReactComponent as GigsIcon } from "./icons/music-solid.svg";
import { ReactComponent as JoinIcon } from "./icons/plus-square-regular.svg";

class Navbar extends Component {
	render() {
		const {
			display_create,
			display_join,
			display_gigs,
			toggleCreate,
			toggleJoin,
			toggleGigs,
		} = this.props;
		return (
			<div className={styles.navbar_container}>
				<div className={styles.button_container} onClick={toggleCreate}>
					<CreateIcon
						style={{ "margin-left": "8px" }}
						color={display_create ? "white" : "grey"}
						width={"40px"}
						height={"40px"}
					/>
					<p
						className={styles.button_text}
						style={{ color: display_create ? "white" : "grey" }}
					>
						Create
					</p>
				</div>
				<div className={styles.button_container} onClick={toggleJoin}>
					<JoinIcon
						color={display_join ? "white" : "grey"}
						width={"40px"}
						height={"40px"}
					/>
					<p
						className={styles.button_text}
						style={{ color: display_join ? "white" : "grey" }}
					>
						Join
					</p>
				</div>
				<div className={styles.button_container} onClick={toggleGigs}>
					<GigsIcon
						color={display_gigs ? "white" : "grey"}
						width={"40px"}
						height={"40px"}
					/>
					<p
						className={styles.button_text}
						style={{ color: display_gigs ? "white" : "grey" }}
					>
						Gigs
					</p>
				</div>
			</div>
		);
	}
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
	display_create: state.dash.toggle_create,
	display_join: state.dash.toggle_join,
	display_gigs: state.dash.toggle_gigs,
});

const mapDispatchToProps = dispatch => ({
	// Add actions to this constant in the format
	// action: () => dispatch(action())
	toggleCreate: () => dispatch(toggleCreate()),
	toggleJoin: () => dispatch(toggleJoin()),
	toggleGigs: () => dispatch(toggleGigs()),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(Navbar));
