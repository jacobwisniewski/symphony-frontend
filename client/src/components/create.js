import React, { Component } from "react";
import { connect } from "react-redux";

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
    // When the create gig button is clicked, a new gig is created and user is redirected to gigs page
    const url = "http://localhost:5000/api/create";
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        gig_name: this.state.gig_name,
        private: this.state.private,
        mongo_id: this.props.mongo_id,
        algorithm: 'test'
      })
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
