import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleGigs } from "../modules/navbarActions";
import { refreshProfile } from "../modules/profileActions"

class Join extends Component {
  constructor() {
    super();
    this.state = {
      invite_code: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState({
      invite_code: value
    });
  }

  handleSubmit(event) {
    const url = "http://localhost:5000/api/join";
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mongo_id: this.props.mongo_id,
        invite_code: this.state.invite_code
      })
    });
    this.props.refreshProfile(this.props.mongo_id)
    this.props.toggleGigs()
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div>
          Invite code
          <input
            name="invite_code"
            type="text"
            value={this.state.invite_code}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button onClick={this.handleSubmit}>Join</button>
        </div>
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  mongo_id: state.profile.mongo_id
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  toggleGigs: () => dispatch(toggleGigs()),
  refreshProfile: (mongo_id) => dispatch(refreshProfile(mongo_id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
