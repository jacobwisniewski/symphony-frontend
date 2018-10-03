import React, { Component } from "react";
import { connect } from "react-redux";
import { getUrl } from "../../modules/loginActions";
import { logout } from "../../modules/logoutActions";

class Login extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.logoutOnClick = this.logoutOnClick.bind(this);
  }

  onClick(event) {
    // A click handler that deals with route handling
    const name = event.target.name;
    // If user is logged in, directly route to the equivalent component
    if (this.props.logged_in) {
      this.props.history.push("/" + name);
    } else {
      // If user is not logged in, get the auth url and redirect
      this.props.getUrl(name).then(url => {
        window.location.href = url;
      });
    }
    // TODO: Error handling for backend errors.
  }

  logoutOnClick() {
    // A click handler that resets the store state
    this.props.logout();
  }
  render() {
    return (
      <div>
        <button name="profile" onClick={this.onClick}>
          Get profile
        </button>
        <button name="create" onClick={this.onClick}>
          Create gig
        </button>
        <button name="join" onClick={this.onClick}>
          Join gig
        </button>
        {/*Renders a disable button if no user logged in*/}
        {this.props.logged_in ? (
          <button name="logout" onClick={this.logoutOnClick} disabled={false}>
            Logout
          </button>
        ) : (
          <button name="logout" onClick={this.logoutOnClick} disabled={true}>
            Logout
          </button>
        )}
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
  getUrl: action => dispatch(getUrl(action)),
  logout: action => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
