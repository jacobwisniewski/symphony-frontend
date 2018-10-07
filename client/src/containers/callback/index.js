import React, { Component } from "react";
import { connect } from "react-redux";
import { createProfile } from "../../modules/profileActions";
import {
  toggleJoin,
  toggleCreate,
  toggleGigs
} from "../../modules/dashActions";
const queryString = require("query-string");

class Callback extends Component {
  componentDidMount() {
    const { code, state } = queryString.parse(this.props.location.search);
    // Check if request and response state are the same
    if (state !== this.props.prev_state) {
      alert("ERROR: Request and response identifying codes are not the same");
      this.props.history.push("/"); //Push user back to index
    }
    this.props.createProfile(code)
    this.props.history.push("/" + this.props.match.params.page); // Redirect the callback to the specified route
  }

  render() {
    return <div>Loading...</div>;
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  prev_state: state.login.state // Previous state
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  createProfile: code => dispatch(createProfile(code)),
  toggleCreate: () => dispatch(toggleCreate()),
  toggleJoin: () => dispatch(toggleJoin()),
  toggleGigs: () => dispatch(toggleGigs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Callback);
