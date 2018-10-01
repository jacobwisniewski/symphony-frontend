import React, { Component } from "react";
import { connect } from "react-redux";
import { getUrl } from "../../modules/loginActions";
import { logout } from "../../modules/logoutActions"
import store from "../../store"

class Login extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.logoutOnClick = this.logoutOnClick.bind(this)
  }

  onClick(event) {
    const name = event.target.name;
    this.props.getUrl(name)
    .then(url => {
      if (!this.props.logged_in) {
        window.location.href = url
      } else {
        this.props.history.push('/' + name)
      }
    })
    // TODO: Error handling it backend is not working
  }

  logoutOnClick() {
    console.log(store.getState())
    this.props.logout()
    console.log(store.getState())
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
        <button name="logout" onClick={this.logoutOnClick}>Logout</button>
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
