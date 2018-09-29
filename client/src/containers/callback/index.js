import React, { Component } from "react";
import { connect } from "react-redux";
const querystring = require("querystring");

class Callback extends Component {
  componentDidMount() {
    const { access_code, state } = querystring.parse(this.props.location.search.substring(1)); // Get the values stored in the current url
    // Check if request and response state are the same
    if (state !== this.props.prev_state) {
      alert("ERROR: Request and response identifying codes are not the same");
      this.props.history.push('/')  //Push user back to index
    }
    this.props.access_code = access_code; // Save the access_code to the store
    this.props.history.push("/" + this.props.match.params.page); // Redirect the callback to the specified route
  }

  render() {
    return <div>Loading...</div>;
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  access_code: state.callback.access_code,
  prev_state: state.login.state // Previous state
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
});

export default connect(
  mapDispatchToProps,
  mapStateToProps
)(Callback);
