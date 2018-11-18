import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleGigs } from "../modules/navbarActions";
import { refreshProfile, joinGig } from "../modules/profileActions";

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
    // Join a gig
    this.props.joinGig(this.props.mongo_id, this.state.invite_code).then(() => {
      // Refresh the profile data
      this.props.refreshProfile(this.props.mongo_id).then(() => {
        // Toggle the gigs page
        this.props.toggleGigs();
      });
    });

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
  refreshProfile: mongo_id => dispatch(refreshProfile(mongo_id)),
  joinGig: (mongo_id, invite_code) => dispatch(joinGig(mongo_id, invite_code))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Join);
