import React, { useContext, useEffect } from 'react';

import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Home } from './home/Home';
import { Profile } from './profile/Profile';
import { LoginScreen } from './login/LoginScreen';
import { RegisterScreen } from './register/RegisterScreen';
import { CreateEventScreen } from './event/CreateEventScreen';
import { DiscoverEventScreen } from './event/DiscoverEventScreen';
import { GoingToEventScreen } from './event/GoingToEventScreen';
import AppTopBar from './core/AppTopBar';
import { BottomNavBar } from './core/BottomNavBar';
import { PrivateRoute } from './user-context/PrivateRoute'
import { UserContext } from './user-context/UserContextProvider';
import { EnforceAnonymousRoute } from './user-context/EnforceAnonymousRoute';
import { EventDetailsScreen } from './event/EventDetailsScreen';
import { EditEventForm } from './event/EditEventForm';

const useCss = makeStyles({
  app: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#9984d414',
  },
  body: {
    flex: '1',
    overflow: 'auto',
  },
});

function App() {
  const testName = 'Welcome to ProEp';
  const { isAuthenticated } = useContext(UserContext);
  const css = useCss();

  const renderRoutes = () => {
    return (
      <Switch>
        <PrivateRoute authed={isAuthenticated()} exact path="/event/create"><CreateEventScreen /></PrivateRoute>
        <PrivateRoute authed={isAuthenticated()} exact path="/event/:id/edit"><EditEventForm /></PrivateRoute>
        <Route path="/event/:id"><EventDetailsScreen /></Route>

        <Route exact path="/" component={Home} />
        <Route path="/discover" ><DiscoverEventScreen /></Route>

        <PrivateRoute authed={isAuthenticated()} path="/profile/:id"><Profile /></PrivateRoute>
        <PrivateRoute authed={isAuthenticated()} path="/going_to"><GoingToEventScreen /></PrivateRoute>
        <EnforceAnonymousRoute authed={isAuthenticated()} path="/login"><LoginScreen /></EnforceAnonymousRoute>
        <EnforceAnonymousRoute authed={isAuthenticated()} path="/register"><RegisterScreen /></EnforceAnonymousRoute>
      </Switch>
    );
  };

  return (
    <div className={css.app}>
      <AppTopBar />
      <div className={css.body}>
        {renderRoutes()}
      </div>
      <BottomNavBar />
    </div>
  );
}

export { App };
