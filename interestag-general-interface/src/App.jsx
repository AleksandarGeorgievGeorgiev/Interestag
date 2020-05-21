import React, { useContext, useEffect } from 'react';

import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { Home } from './home/Home';
import { Profile } from './profile/Profile';
import { LoginScreen } from './login/LoginScreen';
import { RegisterScreen } from './register/RegisterScreen';
import { CreateEventScreen } from './event/CreateEventScreen';
import { DiscoverEventScreen } from './event/DiscoverEventScreen';
import AppTopBar from './core/AppTopBar';
import { BottomNavBar } from './core/BottomNavBar';
import { PrivateRoute } from './user-context/PrivateRoute'
import { UserContext } from './user-context/UserContextProvider';
import { EnforceAnonymousRoute } from './user-context/EnforceAnonymousRoute';
import { EventDetailsScreen } from './event/EventDetailsScreen';

function App() {
  const testName = 'Welcome to ProEp';
  const { isAuthenticated } = useContext(UserContext);
  
  const renderRoutes = () => {
    return (
      <Switch>
        <PrivateRoute authed={isAuthenticated()} exact path="/event/create"><CreateEventScreen /></PrivateRoute>
        <Route path="/event/:id"><EventDetailsScreen /></Route>

        <Route exact path="/" component={Home}/>
        <Route path="/discover" ><DiscoverEventScreen /></Route>

        <PrivateRoute authed={isAuthenticated()} path="/profile/:id"><Profile /></PrivateRoute>

        <EnforceAnonymousRoute authed={isAuthenticated()} path="/login"><LoginScreen /></EnforceAnonymousRoute>
        <EnforceAnonymousRoute authed={isAuthenticated()} path="/register"><RegisterScreen /></EnforceAnonymousRoute>
      </Switch>
    );
  };

  return (

    <div className="App">
      <AppTopBar/>
      <BrowserRouter>
        {renderRoutes()}
      <BottomNavBar/>
      </BrowserRouter>
    </div>
  );
}

export { App };
