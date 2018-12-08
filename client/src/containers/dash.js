import React, { Component } from "react";
import { connect } from "react-redux";
import { getDash } from "../modules/dashActions";
import Header from "../components/header";
import Navbar from "../components/navbar";
import Create from "../components/create";
import Join from "../components/join";
import Gigs from "../components/gigs";

class Dash extends Component {
  render() {
    if (this.props.loading) {
      return <p>Loading...</p>;
    } else {
      return (
        <div>
          <Header />
          {this.props.display_create && <Create />}
          {this.props.display_join && <Join />}
          {this.props.display_gigs && <Gigs />}
          <Navbar />
        </div>
      );
    }
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  api_key: state.dash.profile.api_key,
  logged_in: state.login,
  display_create: state.dash.toggle_create,
  display_join: state.dash.toggle_join,
  display_gigs: state.dash.toggle_gigs,
  loading: state.dash.loading
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  getDash: (access_code, api_key) => dispatch(getDash(access_code, api_key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dash);
