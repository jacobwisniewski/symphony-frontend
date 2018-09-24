import React, { Component } from "react";

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

  getAuthUrl() {
    const url = "http://localhost:5000/api/callback";
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          url: data.url,
          isLoading: false
        }, () => {console.log(this.state)})
      );
  }

  onClick() {
    window.location.href = this.state.url;
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
