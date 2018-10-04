import React, { Component } from "react";
import { connect } from "react-redux";

class Create extends Component {
  constructor() {
    super();
    // States for recording input values
    this.state = {
      gig_name: "",
      private: false
    };
    // Bind change functions
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // Function for handling changing inputs
    const value = event.target.value
    this.setState({
        gig_name: value
    })
  }

  handleSubmit(event) {
    // Function for handling submitting values
    console.log(this.state.gig_name)
    event.preventDefault();

  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.gig_name}
          onChange={this.handleChange}
          placeholder="Gig name"
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Create);
