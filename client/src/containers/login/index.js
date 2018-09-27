import React, { Component } from "react";
import { connect } from "react-redux";
import { getUrl } from "../../modules/loginActions";

class Login extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    const name = event.target.name;
    this.props.getUrl(name).then(({ url, error }) => {
      if (error != null) {
        // Error handling
        alert("ERROR: Callback invalid");
      } else {
        // Change browser url to callback url
        window.location.href = url;
      }
    });
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
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  url: state.login.url,
  loading: state.login.loading,
  error: state.login.error
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  getUrl: action => dispatch(getUrl(action))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
