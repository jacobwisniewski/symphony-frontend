import React, { Component } from "react";
import { connect } from "react-redux";
import { getUrl } from "../modules/loginActions";
import Header from "../components/header"

class Login extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    console.log(this.props.profile)

  }

  onClick(event) {
    // If user is logged in, directly route to the equivalent component
    console.log(this.props.logged_in)
    if (this.props.logged_in) {
      this.props.history.push("/dash");
    } else {
      // If user is not logged in, get the auth url and redirect
      this.props.getUrl().then(url => {
        window.location.href = url;
      });
    }
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
  logged_in: state.login.logged_in,
  profile: state.login
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  getUrl: (action) => dispatch(getUrl(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
