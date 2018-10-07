import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux'
import Login from "../login"
import Callback from "../callback"
import Dash from "../dash"

class App extends Component {
    render() {
        return(
            <div>
                <Route exact path='/' component={Login} />
                <Route path='/:page/callback' component={Callback} />
                <Route exact path='/profile' component={Dash} />
                <Route exact path='/create' component={Dash} />
                <Route exact path='/join' component={Dash} />
                <Route exact path='/gigs' component={Dash} />
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

