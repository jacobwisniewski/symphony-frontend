import React, { Component } from "react";
import { connect } from "react-redux";
import { getUrl } from "../modules/loginActions";
import { logout } from "../modules/logoutActions";
import Header from "../components/header"

class Login extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    // A click handler that deals with route handling
    const name = event.target.name;
    // If user is logged in, directly route to the equivalent component
    if (this.props.logged_in) {
      this.props.history.push("/dash");
    } else {
      // If user is not logged in, get the auth url and redirect
      this.props.getUrl(name).then(url => {
        window.location.href = url;
      });
    }
    // TODO: Error handling for backend errors.
  }

  render() {
    return (
      <div>
        <Header />
        <button name="profile" onClick={this.onClick}>
          Login
        </button>
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  url: state.login.url,
  loading: state.login.loading,
  error: state.login.error,
  logged_in: state.callback.logged_in
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  getUrl: (action) => dispatch(getUrl(action)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
