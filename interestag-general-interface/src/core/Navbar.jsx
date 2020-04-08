import React from 'react'
import { Router } from '@reach/router'

import { Link } from '@reach/router';
import { Home } from '../home/Home';
import { Profile } from '../profile/Profile';
import LoginScreen from '../login/LoginScreen';


const Navbar = () => {

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile/1">Profile</Link>

      <Router>
        <Home path="/" />
        <Profile path="/profile/:id" />
        <LoginScreen path="/login"/>
      </Router>
    </nav>
  )
}

export { Navbar }