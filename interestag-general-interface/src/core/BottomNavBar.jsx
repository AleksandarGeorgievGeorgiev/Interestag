import React, { useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';

import { UserContext } from '../user-context/UserContextProvider';
import { useTokenInterceptor } from '../user-context/useTokenInterceptor';

function BottomNavBar() {
  const { currentUser, isAuthenticated, deauthenticateUser } = useContext(UserContext);
  const { attachInterceptor, detachInterceptor } = useTokenInterceptor();
  
  useEffect(() => {
    attachInterceptor();
    
    return () => detachInterceptor(); //TODO: Move somewhere else
  })

  const renderNavBar = () => {
    if (isAuthenticated()) {
      return (
        <BottomNavigation
          className="bottom-nav-custom-css"
          showLabels
        >
          <BottomNavigationAction component={Link} to={`/profile/${currentUser.userId}`} label="Profile" icon={<PersonIcon />} />
          <BottomNavigationAction component={Link} to="/discover" label="Discover" icon={<SearchIcon />} />
          <BottomNavigationAction component={Link} to="/event/create" label="Add" icon={<AddIcon />} />
          <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon />} />
        </BottomNavigation>
      )
    }

    return (
      <BottomNavigation
        className="bottom-nav-custom-css"
        showLabels
      >
        <BottomNavigationAction component={Link} to="/login/" label="Login" icon={<LockOpenIcon />} />
        <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction component={Link} to="/register/" label="Register" icon={<PersonAddIcon />} />
      </BottomNavigation>
    );
  }

  return (
    <>
      {renderNavBar()}
    </>
  );
}

export { BottomNavBar };
