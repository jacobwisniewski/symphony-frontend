import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleCreate, toggleJoin, toggleGigs } from "../modules/navbarActions";

class Button extends Component {
  render() {
    return <button onClick={this.props.page}>{this.props.name}</button>;
  }
}

class Navbar extends Component {
  render() {
    return (
      <div>
        <Button page={this.props.toggleCreate} name={"Create"} />
        <Button page={this.props.toggleJoin} name={"Join"} />
        <Button page={this.props.toggleGigs} name={"Gigs"} />
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
)(Navbar);
