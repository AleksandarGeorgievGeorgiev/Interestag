import React, { useContext } from 'react';

import { Router, Redirect } from '@reach/router';

import { Home } from './home/Home';
import { Profile } from './profile/Profile';
import LoginScreen from './login/LoginScreen';
import RegisterScreen from './register/RegisterScreen';
import { BottomNavBar } from './core/BottomNavBar';
import AppTopBar from './core/AppTopBar';
import { UserContext } from './user-context/UserContextProvider';

function App() {
  const testName = 'Welcome to ProEp';
  const { currentUser } = useContext(UserContext);
  const renderRoutes = () => {
    if (currentUser.userId) {
      return (
        <>
          <Home default path="/" />
          <Profile path="/profile/:id" />
        </>
      );
    }

    return (
      <>
        <Home default path="/" />
        <LoginScreen path="/login" />
        <RegisterScreen path="/register" />
          <Profile path="/profile/:id" />
        {/* <Redirect from="/profile/*" to="/login" /> */}
      </>
    );
  };

  return (

    <div className="App">
      <AppTopBar pageName={testName} />
      <br />
      <Router>
        {renderRoutes()}
      </Router>
      <BottomNavBar />
    </div>
  );
}

export { App };
