import React, { useContext, useEffect } from 'react';

import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { Home } from './home/Home';
import { Profile } from './profile/Profile';
import { LoginScreen } from './login/LoginScreen';
import { RegisterScreen } from './register/RegisterScreen';
import { BottomNavBar } from './core/BottomNavBar';
import AppTopBar from './core/AppTopBar';
import { UserContext } from './user-context/UserContextProvider';

function App() {
  const testName = 'Welcome to ProEp';
  const { currentUser } = useContext(UserContext);

  const renderRoutes = () => {
    if (currentUser.userId) {
      return (
        <Switch>
          <Route exact path="/" ><Home /></Route>
          <Route path="/profile/:id" ><Profile /></Route>
        </ Switch>
      );
    }

    return (
      <Switch>
        <Route exact path="/" ><Home /></Route>
        <Route path="/login/" ><LoginScreen /></Route>
        <Route path="/register/" > <RegisterScreen /></Route>
        <Redirect from="/profile/*" to="/login" />
      </ Switch>
    );
  };

  return (

    <div className="App">
      <AppTopBar pageName={testName} />
      <br />
      <BrowserRouter>
        {renderRoutes()}
        <BottomNavBar />
      </BrowserRouter>
    </div>
  );
}

export { App };
