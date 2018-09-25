import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux'
import Login from "../login"

class App extends Component {
    render() {
        return(
        <Route exact path='/' component={Login} />)
    }
}

// Lets the component subscribe to redux state changes
const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    // Add actions to this constant in the format
    // action: () => dispatch(action())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);

