import React, { useContext, useEffect } from 'react';

import { BrowserRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom';

import { Home } from './home/Home';
import { Profile } from './profile/Profile';
import { LoginScreen } from './login/LoginScreen';
import { RegisterScreen } from './register/RegisterScreen';
import { BottomNavBar } from './core/BottomNavBar';
import AppTopBar from './core/AppTopBar';
import { PrivateRoute } from './user-context/PrivateRoute'
import { UserContext } from './user-context/UserContextProvider';

function App() {
  const testName = 'Welcome to ProEp';
  const { currentUser, isAuthenticated, isLoggedIn } = useContext(UserContext);

  const renderRoutes = () => {
    if (isAuthenticated()) {
      return (
        <Switch>
          {/* <Route exact path="/" ><Home /></Route>
          <Route path="/profile/:id" render={<PrivateRoute component={Profile}/>}></Route> */}
          {/* <Redirect from="/*" to="/login" /> */}

          <PrivateRoute authed={isAuthenticated()} path="/profile/:id" component={Profile}/>
          <PrivateRoute authed={isLoggedIn()} exact path="/" component={Home}/>
        </Switch>
      );
    }

    return (
      <Switch>
        <Route exact path="/" ><Home /></Route>
        <Route path="/login/" ><LoginScreen /></Route>
        <Route path="/register/" > <RegisterScreen /></Route>
        <Redirect from="/profile/*" to="/login" />
      </Switch>
    );
  };

  return (

    <div className="App">
      <AppTopBar pageName={testName} />
      <br />
      <BrowserRouter>
        {renderRoutes()}
      <BottomNavBar/>
      </BrowserRouter>
    </div>
  );
}

export { App };
