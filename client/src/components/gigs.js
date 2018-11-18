import React, { Component } from "react";
import { connect } from "react-redux";

class Gig extends Component {
  render() {
    return <div>{this.props.gig_name}</div>;
  }
}

class Gigs extends Component {
  componentDidMount() {
    console.log(this.props.user_gigs)
  }
  render() {
    const { user_gigs } = this.props;
    return (
      <div>
        {user_gigs.map(gig => (
          <Gig key={gig.gig_id} gig_name={gig.gig_name} />
        ))}
      </div>
    );
  }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  user_gigs: state.profile.user_gigs
});

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gigs);
