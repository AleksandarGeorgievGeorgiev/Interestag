import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const EnforceAnonymousRoute = ({ component: Component, authed, ...rest }) =>  {
    return (
        <Route {...rest} render={(props) => 
            authed === true
            ? 
                <Redirect to={{
                    pathname: '/',
                    state: { from: props.location }
                }} />
            : 
                <Component {...props} />
        } />
    );
}

export { EnforceAnonymousRoute } 