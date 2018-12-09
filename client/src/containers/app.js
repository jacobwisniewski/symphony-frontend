import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { resetDash } from "../modules/dashActions"
import Login from "./login";
import Callback from "./callback";
import Dash from "./dash";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/callback" component={Callback} />
        <Route path="/dash" component={Dash} />
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  resetDash: () => dispatch(resetDash())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
