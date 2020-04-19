import React, { useContext } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from '@reach/router';
import { UserContext } from '../user-context/UserContextProvider';


function BottomNavBar() {
  const { currentUser } = useContext(UserContext);

  return (
    <BottomNavigation
      className="bottom-nav-custom-css"
      showLabels
    >
      <BottomNavigationAction component={Link} to={`/profile/${currentUser.userId}`} label="Profile" icon={<PersonIcon />} />
      <BottomNavigationAction component={Link} to="/" label="Add" icon={<AddIcon />} />
      <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction component={Link} to="/" label="Settings" icon={<SettingsIcon />} />
    </BottomNavigation>
  );
}

export { BottomNavBar };
