import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleCreate, toggleJoin, toggleGigs } from "../modules/dashActions"

class Button extends Component {
  render() {
    return <button onClick={this.props.toggle}>{this.props.name}</button>;
  }
}

class Navbar extends Component {
  render() {
    return (
      <div>
        <Button toggle={this.props.toggleCreate} name={"Create"} />
        <Button toggle={this.props.toggleJoin} name={"Join"} />
        <Button toggle={this.props.toggleGigs} name={"Gigs"} />
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  toggleCreate: () => dispatch(toggleCreate()),
  toggleJoin: () => dispatch(toggleJoin()),
  toggleGigs: () => dispatch(toggleGigs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
