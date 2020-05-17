import React, { useState, useEffect } from 'react';

import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useClientStorage } from '../core/useClientStorage';

const UserContext = React.createContext(
  {
    currentUser: {},
    handleLoginSubmit: () => {},
    handleRegister: () => {},
  },
);

const createFakeCookie = ({ username }) => {
  const jwt  = {
    userId: 1,
    username: username,
    permissions: [],
    jwt: new Date(Date.now() + 5*60000).toString(),
  }

  Cookies.set('jwt', 
    window.btoa(JSON.stringify(jwt)),
    { expires: new Date(Date.now() + 5*60000) });
}

const createFakeLoggedInCookie = () => {
  const refreshToken = {
    expires: new Date(Date.now() + 30*24*60*60*60000).toString()
  }
  
  Cookies.set('rte', 
    window.btoa(JSON.stringify(refreshToken)),
    { expires: new Date(Date.now() + 30*24*60*60*60000) });
}

const UserContextProvider = ({ children }) => {
  const clientStorage = useClientStorage();
  const [currentUser, setUserData] = useState(() => { 
    const user = clientStorage.getFromStorage('currentUser');

    return user ? user : {}
  });

  const authenticateUser = (response) => {
    createFakeCookie(response);
    createFakeLoggedInCookie();

    const jwt = JSON.parse(window.atob(Cookies.get('jwt').trim()));
    const refreshToken = JSON.parse(window.atob(Cookies.get('rte').trim()));
    const userData = {
      ...jwt,
      refreshToken: refreshToken.expires
    }

    clientStorage.saveInStorage('currentUser', userData);
    setUserData(userData);
  };

  const deauthenticateUser = () => {
    clientStorage.removeFromStorage('currentUser'); 
    setUserData({}); //TEST ONLY
    // axios.post(`${process.env.REACT_APP_BASEURL}/api/auth/token/logout/`, {})
    //   .then((res) => { clientStorage.removeFromStorage('currentUser'); setUserData({}); });
  }

  const isAuthenticated = () => {
    return currentUser.refreshToken ? Date.now() < Date.parse(currentUser.refreshToken) : false;
  }

  return (
    <UserContext.Provider value={{ 
      currentUser,
      isAuthenticated,
      authenticateUser,
      deauthenticateUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
