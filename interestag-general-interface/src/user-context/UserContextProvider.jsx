import React, { useState, useEffect } from 'react';

import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Cookies from 'js-cookie';

import { useClientStorage } from '../core/useClientStorage';

const UserContext = React.createContext(
  {
    currentUser: {},
  },
);

const UserContextProvider = ({ children }) => {
  const clientStorage = useClientStorage();
  const [currentUser, setUserData] = useState(() => { 
    const user = clientStorage.getFromStorage('currentUser');

    return user ? user : {}
  });

  const authenticateUser = (response) => {
    const jwtCookie = Cookies.get('jwt');
    const decoded = window.atob(jwtCookie.trim().split('.')[1]);
    const userData = JSON.parse(decoded);

    clientStorage.saveInStorage('currentUser', userData);
    setUserData(userData);
  };

  const deauthenticateUser = () => {
    // axios.post(`${process.env.REACT_APP_BASEURL}/api/auth/token/logout/`, {}, { withCredentials: true })
    
    clientStorage.removeFromStorage('currentUser'); 
    setUserData({});
  }

  const isAuthenticated = () => {
    const rteCookie = Cookies.get('rte');
    return rteCookie ? true : false;
  }

  const isJwtFresh = () => {
    return currentUser.exp ? currentUser.exp > Date.now()/1000 : false;
  }

  return (
    <UserContext.Provider value={{ 
      currentUser,
      isAuthenticated,
      authenticateUser,
      deauthenticateUser,
      isJwtFresh,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
