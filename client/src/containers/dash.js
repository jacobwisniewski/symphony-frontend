import React, { Component } from "react";
import { connect } from "react-redux";
import Join from "../components/join";
import Gigs from "../components/gigs";
import Create from "../components/create";
import Navbar from "../components/navbar";
import Header from "../components/header";

const dash_styles: any = require("./styles/dash.css");


class Dash extends Component {
  componentDidMount() {
    if (!this.props.logged_in) {
      this.props.history.push("/");
    }
  }
  render() {
    if (this.props.loading) {
      return <p>Loading...</p>;
    } else {
      return (
        <div style={{ height: "100%" }}>
          <Header />
          <div >
            {this.props.displayCreate && <Create style={{'margin-top': '30px'}}/>}
            {this.props.displayJoin && <Join />}
            {this.props.displayGigs && <Gigs />}
          </div>
          <Navbar />
        </div>
      );
    }
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  displayCreate: state.navbar.toggleCreate,
  displayJoin: state.navbar.toggleJoin,
  displayGigs: state.navbar.toggleGigs,
  logged_in: state.callback.logged_in,
  loading: state.profile.loading
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dash);
