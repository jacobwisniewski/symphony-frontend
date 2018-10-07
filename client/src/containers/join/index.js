import React, { Component } from "react"
import { connect } from "react-redux"

class Join extends Component {
    render() {
        return <p>Join component</p>
    }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
    ...state
  });
  
  const mapDispatchToProps = dispatch => ({
    // Add actions to this constant in the format
    // action: () => dispatch(action())
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Join);
  