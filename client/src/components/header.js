import React, { Component } from "react";
import { logout } from "../modules/logoutActions";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.logout();
    // TODO: This method of going back to index is hacky
    window.location.href = "http://localhost:3000"
  }

  render() {
    return (
      <div>
        <Link to='/' >Symphony</Link>
        {/*Disables or unrenders the button when user is not logged in*/}
        {this.props.logged_in ? (
          <button name="logout" onClick={this.handleClick} disabled={false}>
            Logout
          </button>
        ) : (
          <button name="logout" disabled={true}>
            Logout
          </button>
        )}
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  logged_in: state.callback.logged_in
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
