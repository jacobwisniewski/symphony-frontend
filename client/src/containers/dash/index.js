import React, { Component } from "react";
import { connect } from "react-redux";
import {
  activateCreate,
  activateJoin,
  activateGigs
} from "../../modules/navbarActions";
import Profile from "../profile";
import Join from "../join";
import Gigs from "../gigs";
import Create from "../create";
import Navbar from "../../components/navbar";

class Dash extends Component {
  render() {
    return (
      <div>
        <Profile />
        {this.props.displayJoin && <Join />}
        {this.props.displayCreate && <Create />}
        {this.props.displayGigs && <Gigs />}
        <Navbar />
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  displayCreate: state.navbar.toggleCreate,
  displayJoin: state.navbar.toggleJoin,
  displayGigs: state.navbar.toggleGigs
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dash);
