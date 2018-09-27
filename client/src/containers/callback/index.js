import React, { Component } from "react";
const querystring = require("querystring");

class Callback extends Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      data: null
    };
  }

  componentDidMount() {
    const values = querystring.parse(this.props.location.search.substring(1));
    const access_code = values.code;
    this.getAuthUrl(access_code);
  }

  getAuthUrl(access_code) {
    const url = "http://localhost:5000/api/login";
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ access_code: access_code })
    })
      .then(response => response.json())
      .then(data =>
        this.props.history.push({
          pathname: "/" + this.props.match.params.page,
          state: { data: data }
        })
      );
  }

  render() {
    return <div>Loading...</div>;
  }
}

export default Callback;
