import React, { Component } from "react";
import { Route } from "react-router-dom";
import Login from "../login"
import Callback from "../callback"
import Profile from "../profile"

class App extends Component {
    render() {
        return(
            <div>
                <Route exact path='/' component={Login} />
                <Route path='/:page/callback' component={Callback} />
                <Route exact path='/profile' component={Profile} />
            </div>
        )
    }
}


export default App;

