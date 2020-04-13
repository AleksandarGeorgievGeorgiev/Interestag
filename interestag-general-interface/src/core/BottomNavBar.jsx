import React, { useContext } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from '@reach/router';
import { UserContext } from './UserContext';


function BottomNavBar() {
  const { currentUser } = useContext(UserContext);

  return (
    <BottomNavigation
      className="bottom-nav-custom-css"
      showLabels
    >
      <Link to={`/profile/${currentUser.userId}`}><BottomNavigationAction label="Profile" icon={<PersonIcon />} /></Link>
      <Link to="/"><BottomNavigationAction label="Add" icon={<AddIcon />} /></Link>
      <Link to="/"><BottomNavigationAction label="Home" icon={<HomeIcon />} /></Link>
      <Link to="/"><BottomNavigationAction label="Settings" icon={<SettingsIcon />} /></Link>
    </BottomNavigation>
  );
}

export { BottomNavBar };
