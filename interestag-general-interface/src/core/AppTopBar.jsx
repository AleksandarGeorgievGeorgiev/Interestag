import React, { useContext } from 'react';

import AppBar from '@material-ui/core/AppBar';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { UserContext } from '../user-context/UserContextProvider';

function AppTopBar({ pageName }) {
  const { isAuthenticated, deauthenticateUser } = useContext(UserContext);

  return (
    <AppBar className="AppBar" style={{ flexDirection: 'row', justifyContent: 'center' }}>
      <div style={{marginLeft: 'auto'}}>
        <h3>{pageName}</h3>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        {isAuthenticated() &&
          <BottomNavigationAction onClick={deauthenticateUser} label="Logout" icon={<ExitToAppIcon />} />
        }
      </div>
    </AppBar>
  );
}

export default AppTopBar;
