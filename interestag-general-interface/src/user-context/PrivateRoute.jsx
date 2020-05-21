import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, authed, ...rest }) => {
  return (
    <Route {...rest}>
      {authed ?
        children
        :
        <Redirect to="/login" />
      }
    </Route>
  );
}

export { PrivateRoute } 
