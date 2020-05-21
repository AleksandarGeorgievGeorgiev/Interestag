import React, { useContext } from 'react';

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
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import { makeStyles } from '@material-ui/core/styles';

import { UserContext } from '../user-context/UserContextProvider';

const useStyles = makeStyles({
  root: {
    minWidth: 0
  }
});

function BottomNavBar() {
<<<<<<< HEAD
  const { currentUser, isAuthenticated } = useContext(UserContext);
=======
  const classes = useStyles();
  const { currentUser, isAuthenticated, deauthenticateUser } = useContext(UserContext);
  const { attachInterceptor, detachInterceptor } = useTokenInterceptor();
  
  useEffect(() => {
    attachInterceptor();
    
    return () => detachInterceptor(); //TODO: Move somewhere else
  })
>>>>>>> d2515b493196ff8b9fefa774d527fa21edfbb6fd

  const renderNavBar = () => {
    if (isAuthenticated()) {
      return (
        <BottomNavigation
          className="bottom-nav-custom-css"
          showLabels
        >
<<<<<<< HEAD
          <BottomNavigationAction component={Link} to={`/profile/${currentUser.userId}`} label="Profile" icon={<PersonIcon />} />
          <BottomNavigationAction component={Link} to="/discover" label="Discover" icon={<SearchIcon />} />
          <BottomNavigationAction component={Link} to="/event/create" label="Add" icon={<AddIcon />} />
          <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon />} />
=======
          <BottomNavigationAction classes={{root: classes.root}} component={Link} to="/" label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction classes={{root: classes.root}} component={Link} to="/discover" label="Discover" icon={<SearchIcon />}/>
          <BottomNavigationAction classes={{root: classes.root}} component={Link} to="/attending" label="Going-to" icon={<FlightTakeoffIcon />} />
          <BottomNavigationAction classes={{root: classes.root}} component={Link} to="/event" label="Add" icon={<AddIcon />} />
          <BottomNavigationAction classes={{root: classes.root}} component={Link} to={`/profile/${currentUser.userId}`} label="Profile" icon={<PersonIcon />}/>
>>>>>>> d2515b493196ff8b9fefa774d527fa21edfbb6fd
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
