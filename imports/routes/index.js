import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Redirect} from 'react-router'

//components
import Login from '../ui/Login'
import Signin from '../ui/Sigin'
import Dashboard from '../ui/Dashboard'

const Routes = (props) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => (
                    props.isAuth ? (<Redirect to="/dashboard"/>) : (<Login/>)
                )}/> 
                <Route path="/signin" render={() => (
                    props.isAuth ? (<Redirect to="/dashboard"/>) : (<Signin/>)
                )}/>
                <Route path="/dashboard" render={() => (
                    props.isAuth ? (<Dashboard/>) : (<Redirect to="/"/>)
                )}/>
            </Switch>
        </Router>
    )
}

export default Routes