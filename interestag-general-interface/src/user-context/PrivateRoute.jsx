import React, { useContext, Component } from 'react';
import { UserContext } from './UserContextProvider'
import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { LoginForm } from '../login/LoginForm';

const PrivateRoute = ({ component: Component, authed, ...rest }) =>  {
    return (
        <Route {...rest} render={(props) => 
            authed === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        } />
    );
}

export { PrivateRoute } 
