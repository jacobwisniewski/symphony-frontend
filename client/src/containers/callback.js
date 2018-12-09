import React, { Component } from "react";
import { connect } from "react-redux";
import { getDash, setPrevPath } from "../modules/dashActions";
import querySearch from "stringquery";

class Callback extends Component {
	componentDidMount() {
		const { code, state } = querySearch(this.props.location.search);
		// Check if request and response state are the same
		if (state !== this.props.prev_state) {
			alert(
				"ERROR: Request and response identifying codes are not the same",
			);
			this.props.history.push("/"); //Push user back to index
		}
		this.props.getDash(code, null);
		this.props.history.push({
			pathname: "/dash",
			state: { from: this.props.location.pathname },
		}); // Redirect the callback to the dash if successful
	}

	render() {
		return <div>Loading...</div>;
	}
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
	prev_state: state.login.state, // Previous state
});

const mapDispatchToProps = dispatch => ({
	// Add actions to this constant in the format
	// action: () => dispatch(action())
	getDash: (access_code, api_key) => dispatch(getDash(access_code, api_key)),
	setPrevPath: prev_path => dispatch(setPrevPath(prev_path)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Callback);
