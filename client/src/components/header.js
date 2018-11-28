import React, { Component } from "react";
import { connect } from "react-redux";
import { userLogout } from "../modules/loginActions";
import { withRouter} from "react-router-dom";


class Header extends Component {
  constructor() {
    super();
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  onClickLogout() {
    // A handle for handling logging out of Symphony
    this.props.userLogout();
    this.props.history.push('/')
  }
  
  render() {
    return (
      <div>
        <button onClick={() => this.props.history.push('/')}>Symphony</button>
        <button onClick={() => this.onClickLogout()}>Logout</button>
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  userLogout: () => dispatch(userLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Header));
