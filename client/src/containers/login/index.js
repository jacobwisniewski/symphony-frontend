import React, { Component } from 'react'


class Login extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: false
        }
    }
    componentDidMount() {
        this.setState({
            isLoading: true
        })
    }
    
    
    getAuthUrl() {
        const url = 'http://localhost:5000/api/callback'
        fetch(url)
        .then(response => response.json())
        .then(data => this.setState({
            url: data.url,
            state: data.state,
            isLoading: false
        }))
    }
    onClick() {
        window.location.hred = this.state.url
    }
    render() {
        if (this.state.isLoading) {
            return(<p>Loading...</p>)
        } else {
            return(<button onClick={this.onClick}>Login</button>)
        }
    }
}

export default Login