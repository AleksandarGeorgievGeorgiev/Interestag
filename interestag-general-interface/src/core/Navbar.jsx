import React, { useContext } from 'react';
import { Link } from '@reach/router';
import { UserContext } from '../core/UserContext';

const Navbar = () => (
  const { currentUser } = useContext(UserContext);

  <nav>
    <Link to="/">Home</Link>
    <Link to={`/profile/`}>Profile</Link>
  </nav>
);

export { Navbar };
