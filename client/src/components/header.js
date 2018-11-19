import React, { Component } from "react";
import { logout } from "../modules/logoutActions";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

const header_styles: any = require("./styles/header.css");


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
      <div className={header_styles.header} >
        <Link style={{color: 'white'}} to='/'>Symphony</Link>
        {/*Disables or unrenders the button when user is not logged in*/}
        {this.props.logged_in ? (
          <button name="logout" onClick={this.handleClick} disabled={false} className={header_styles.header_buttons}>
            Logout
          </button>
        ) : (
          null
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
