import React from 'react';

import { Navbar } from './core/Navbar'
import { Router } from '@reach/router'
import { Link } from '@reach/router'
import { Home } from './home/Home'
import { Profile } from './profile/Profile'
import LoginScreen from './login/LoginScreen'
import RegisterScreen from './register/RegisterScreen'
import BottomNavBar from './core/BottomNavBar'
import AppTopBar from './core/AppTopBar'

function App() {
  const testName = 'Welcome to ProEp';
  return (
    <div className="App">
      <AppTopBar pageName={testName} />
      <br/>
      <Router>
        <Home path="/" />
        <Profile path="/profile/:id" />
        <LoginScreen path="/login"/>
        <RegisterScreen path="/register"/>
      </Router>
      <BottomNavBar/>
    </div>
  );
}


export default App;
