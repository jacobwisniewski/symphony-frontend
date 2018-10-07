import React, { Component } from "react";
import { connect } from "react-redux";
import {
  toggleJoin,
  toggleCreate,
  toggleGigs,
  activateCreate,
  activateJoin,
  activateGigs
} from "../../modules/dashActions";
import Profile from "../profile"
import Join from "../join"
import Gigs from "../gigs"
import Create from "../create"

class Dash extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    const currentPath = this.props.location.pathname;
    // Toggle the relevant tab based on the url
    if (currentPath === "/create") {
      // Execute toggleCreate
      this.props.activateCreate();
    } else if (currentPath === "/join") {
      // Execute toggleJoin
      this.props.activateJoin();
    } else if (currentPath === "/gigs") {
      // Execute toggleGigs
      this.props.activateGigs();
    }
  }
  onClick(event) {
    const name = event.target.name
    if (name === "join") {
      this.props.toggleJoin();
      this.props.history.push('/join')
    } else if (name === 'gigs') {
      this.props.toggleGigs();
      this.props.history.push('/gigs')
    } else if (name === 'create') {
      this.props.toggleCreate();
      this.props.history.push('/create')
    }
  }
  render() {
    return (
      <div>
        <div>
          <Profile />
          <button name="join" onClick={this.onClick}>
            Toggle join
          </button>
          {this.props.displayJoin && <Join />}
        </div>
        <div>
          <button name="create" onClick={this.onClick}>
            Toggle create
          </button>
          {this.props.displayCreate && <Create />}
        </div>
        <div>
          <button name="gigs" onClick={this.onClick}>
            Toggle gigs
          </button>
          {this.props.displayGigs && <Gigs />}
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
  toggleGigs: () => dispatch(toggleGigs()),
  activateCreate: () => dispatch(activateCreate()),
  activateJoin: () => dispatch(activateJoin()),
  activateGigs: () => dispatch(activateGigs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dash);
