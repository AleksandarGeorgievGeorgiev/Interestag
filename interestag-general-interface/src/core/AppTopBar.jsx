import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import logo from '../resources/TestGraphTablet.png';
import Slide from '@material-ui/core/Slide';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { UserContext } from '../user-context/UserContextProvider';

const useCss = makeStyles({
  root: {
    backgroundColor: '#edeaf5',
  }
});

function AppTopBar({ props }) {
  const { isAuthenticated, deauthenticateUser } = useContext(UserContext);
  const css = useCss();

  function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  return (
    <HideOnScroll {...props}>
    <AppBar classes={{ root: css.root }} position="relative" style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <div className="app-top-bar-icon">
        <img src={logo} alt="Logo" className="app-logo" />
      </div>
      <div style={{ marginLeft: 'auto' }}>
        {isAuthenticated() &&
          <BottomNavigationAction onClick={deauthenticateUser} label="Logout" icon={<ExitToAppIcon />} />
        }
      </div>
    </AppBar>
    </HideOnScroll>
  );
}

export default AppTopBar;
