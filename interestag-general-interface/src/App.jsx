import React, { useContext, useEffect } from 'react';

import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { Home } from './home/Home';
import { Profile } from './profile/Profile';
import { LoginScreen } from './login/LoginScreen';
import { RegisterScreen } from './register/RegisterScreen';
import { CreateEventScreen } from './event/CreateEventScreen';
import { DiscoverEventScreen } from './event/DiscoverEventScreen';

import { BottomNavBar } from './core/BottomNavBar';
import AppTopBar from './core/AppTopBar';
import { PrivateRoute } from './user-context/PrivateRoute'
import { UserContext } from './user-context/UserContextProvider';
import { EnforceAnonymousRoute } from './user-context/EnforceAnonymousRoute';
import { LoginForm } from './login/LoginForm';

function App() {
  const testName = 'Welcome to ProEp';
  const { currentUser, isAuthenticated } = useContext(UserContext);

  const renderRoutes = () => {
    return (
      <Switch>
        <PrivateRoute authed={isAuthenticated()} path="/profile/:id" component={Profile}/>
        <Route authed={isAuthenticated()} exact path="/" component={Home}/>
        <PrivateRoute authed={isAuthenticated()} path="/event" component={CreateEventScreen}/>
        <Route path="/discover" ><DiscoverEventScreen /></Route> 
        <EnforceAnonymousRoute authed={isAuthenticated()} path="/login" component={LoginScreen}/>
        <EnforceAnonymousRoute authed={isAuthenticated()} path="/register" component={RegisterScreen}/>
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
