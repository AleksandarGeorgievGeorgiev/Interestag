import React from 'react'
import { Router } from '@reach/router'

import { Link } from '@reach/router';
import { Home } from '../home/Home';
import { Profile } from '../profile/Profile';


const Navbar = () => {

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/profile/1">Profile</Link>

      <Router>
        <Home path="/" />
        <Profile path="/profile/:id" />
      </Router>
    </nav>
  )
}

export { Navbar }