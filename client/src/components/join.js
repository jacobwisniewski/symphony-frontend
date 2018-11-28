import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Join extends Component {
  render() {
    return <p>Join</p>;
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Join));
