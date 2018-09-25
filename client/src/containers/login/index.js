import React, { Component } from "react";
import { fetchUrl } from '../../modules/loginActions'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.getAuthUrl();
  }




  render() {
    if (this.state.isLoading) {
      return <p>Loading...</p>;
    } else {
      return <a href={this.state.url}>Login</a>;
    }
  }
}

export default Login;
