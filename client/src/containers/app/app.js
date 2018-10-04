import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux'
import Login from "../login"
import Callback from "../callback"
import Profile from "../profile"
import Create from "../create"


class App extends Component {
    render() {
        return(
            <div>
                <Route exact path='/' component={Login} />
                <Route path='/:page/callback' component={Callback} />
                <Route exact path='/profile' component={Profile} />
                <Route path='/create' component={Create} />
            </div>
        )
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

