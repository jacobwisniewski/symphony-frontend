import React, { Component } from 'react'


class Start extends Component {
    constructor() {
        super()
        this.state = {
            isLoading: false
        }
    }
    componentDidMount() {

    }
    
    
    getAuthUrl() {
        const url = 'http://localhost:5000/api/callback'
        fetch(url)
        .then(response => response.json())
    }
    render() {
        return (

        )
    }
}

export default Login