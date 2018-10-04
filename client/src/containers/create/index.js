import React, { Component } from "react";
import { connect } from "react-redux";

class Create extends Component {
  render() {
    return null;
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
