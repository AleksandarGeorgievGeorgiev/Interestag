import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const EnforceAnonymousRoute = ({ children, authed, ...rest }) => {
  return (
    <Route {...rest}>
      {authed ?
        <Redirect to="/" />
        :
        children
      }
    </Route>
  );
}

export { EnforceAnonymousRoute } 