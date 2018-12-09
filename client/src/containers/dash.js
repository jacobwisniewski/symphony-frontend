import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../components/header";
import Navbar from "../components/navbar";
import Create from "../components/create";
import Join from "../components/join";
import Gigs from "../components/gigs";

class Dash extends Component {
  componentDidMount() {
    // Pushes the user to index if they have not logged in
    if (!this.props.logged_in && this.props.loading ) {
      this.props.history.push('/')
    }
  }
  render() {
    if (this.props.loading) {
      return <div>
        <Header />
        <p>Loading...</p>
        <Navbar />
      </div>
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
  logged_in: state.login.logged_in,
  display_create: state.dash.toggle_create,
  display_join: state.dash.toggle_join,
  display_gigs: state.dash.toggle_gigs,
  loading: state.dash.loading
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dash);
