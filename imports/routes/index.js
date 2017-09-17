import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Redirect} from 'react-router'

//components
import Login from '../ui/Login'
import Signin from '../ui/Sigin'
import Dashboard from '../ui/Dashboard'

import {NotFound} from '../ui/404'

const Routes = (props) => {
    return (
        <Router>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (props.isAuth
                    ? (<Redirect to="/devloyaut"/>)
                    : (<Login/>))}/>
                <Route
                    path="/signin"
                    render={() => (props.isAuth
                    ? (<Redirect to="/devloyaut"/>)
                    : (<Signin/>))}/>
                <PrivateRouter path='/devloyaut' component={Dashboard} isAuth={props.isAuth}/>
            </Switch>
        </Router>
    )
}

const PrivateRouter = ({
    component: Component,
    ...rest,
    isAuth
}) => (
    <Route
        {...rest}
        render={(props) => (isAuth
        ? (<Component {...props}/>)
        : (<Redirect to={{
            pathname: "/",
            state: {form: props.location}
        }}/>))}/>
);

export const DashboardRoutes = ({match}) => {
    return (
        <Switch>
            <Route exact path={`${match.url}`} component={DASH}/>
            <Route exact path={`${match.url}/doc`} component={Doc}/>
            <Route exact path={`${match.url}/api`} component={Api}/>
        </Switch>
    )
};


// test components
const Doc = () => <div>DOC</div>;
const Api = () => <div>Api</div>;
const DASH = () => <div>DASH</div>;


export default Routes