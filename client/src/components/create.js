import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleGigs } from "../modules/navbarActions";
import { refreshProfile, createGig } from "../modules/profileActions";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      gig_name: "",
      private: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // When the gig_name input or the private checkbox is changed the state is updated accordingly
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // When submit button is clicked, create a new gig and toggle gigs page
    this.props
      .createGig(this.props.mongo_id, this.state.gig_name, this.state.private)
      .then(() => {
        // Requests for new profile data (including the new gig)
        this.props.refreshProfile(this.props.mongo_id).then(() => {
          // Toggles gigs page
          this.props.toggleGigs();
        });
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div>
          Gig name
          <input
            name="gig_name"
            type="text"
            value={this.state.gig_name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          Public
          <input
            name="private"
            type="checkbox"
            checked={this.state.private}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button onClick={this.handleSubmit}>Create</button>
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
  createGig: (mongo_id, gig_name, discoverable) =>
    dispatch(createGig(mongo_id, gig_name, discoverable))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
