import React, { useState } from 'react';

import { Router } from '@reach/router';

import { Home } from './home/Home';
import { Profile } from './profile/Profile';
import { useLogin } from './login/useLogin';
import LoginScreen from './login/LoginScreen';
import RegisterScreen from './register/RegisterScreen';
import { BottomNavBar } from './core/BottomNavBar';
import AppTopBar from './core/AppTopBar';

function App() {
  const [currentUser, setUserData] = useState();
  const loginUser = useLogin();
  const testName = 'Welcome to ProEp';

  const handleLoginSubmit = (userCredentials) => {
    const userData = loginUser(userCredentials);

    setUserData(userData);
  };

  return (
    <div className="App">
      <AppTopBar pageName={testName} />
      {currentUser && currentUser.userName}
      <br />
      <Router>
        <Home path="/" />
        <Profile path="/profile/:id" />
        <LoginScreen path="/login" handleLoginSubmit={handleLoginSubmit} />
        <RegisterScreen path="/register" />
      </Router>
      <BottomNavBar />
    </div>
  );
}


export { App };
