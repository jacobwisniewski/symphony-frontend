import React, { Component } from "react";
import { connect } from "react-redux";
import {
  toggleJoin,
  toggleCreate,
  toggleGigs
} from "../../modules/dashActions";
import Profile from "../profile";
import Join from "../join"
import Gigs from "../gigs"

class Dash extends Component {
    constructor() {
        super()
        this.onClick = this.onClick.bind(this)
    }
  componentDidMount() {
    const currentPath = this.props.location.pathname
    // Toggle the relevant tab based on the url
    if (currentPath === "/create") {
      // Execute toggleCreate
      this.props.toggleCreate();
    } else if (currentPath === "/join") {
      // Execute toggleJoin
      this.props.toggleJoin();
    } else if (currentPath === "/gigs") {
      // Execute toggleGigs
      this.props.toggleGigs();
    }
  }
  onClick(event) {
      if (event.target.name === 'join') {
        this.props.toggleJoin()
      } else {
          this.props.toggleGigs()
      }
  }
  render() {
    return (
        <div>
      <div>
        <Profile />
        <button name="join" onClick={this.onClick}>Toggle join</button>
        { this.props.displayJoin && <Join /> }
        </div>
        <div>
        <button name="gigs" onClick={this.onClick}>Toggle gigs</button>
        { this.props.displayGigs && <Gigs /> }
      </div>
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  displayCreate: state.dash.toggleCreate,
  displayJoin: state.dash.toggleJoin,
  displayGigs: state.dash.toggleGigs
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  toggleCreate: () => dispatch(toggleCreate()),
  toggleJoin: () => dispatch(toggleJoin()),
  toggleGigs: () => dispatch(toggleGigs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dash);
