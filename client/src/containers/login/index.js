import React, { Component } from "react";
import { connect } from 'react-redux'
import { getUrl } from '../../modules/loginActions'

class Login extends Component {
  componentDidMount() {
    this.props.getUrl()
  }
  render() {
    const { url, loading, error } = this.props.login 
    if (loading) {
      return(<p>Loading...</p>)
    } else {
      return(<a href={url}>Login</a>)
    }
  }
}



// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  // Add actions to this constant in the format
  // action: () => dispatch(action())
  getUrl: () => dispatch(getUrl())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)