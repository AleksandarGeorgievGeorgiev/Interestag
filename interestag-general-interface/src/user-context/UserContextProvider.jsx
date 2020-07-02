import React, { useState, useEffect } from 'react';

import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import { useClientStorage } from '../core/useClientStorage';

const UserContext = React.createContext(
  {
    currentUser: {},
  },
);

const UserContextProvider = ({ children }) => {
  const navigationHistory = useHistory();
  const clientStorage = useClientStorage();
  const [currentUser, setUserData] = useState(() => {
    const user = clientStorage.getFromStorage('currentUser');

    return user || {};
  });

  const authenticateUser = () => {
    const jwtCookie = Cookies.get('jwt');
    const decoded = window.atob(jwtCookie.trim().split('.')[1]);
    let userData = JSON.parse(decoded);
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/auth/profile/${userData.userId}/`)
      .then((res) => {
        userData = { ...userData, first_name: res.data.first_name, last_name: res.data.last_name };

        clientStorage.saveInStorage('currentUser', userData);
        setUserData(userData);
      });

    clientStorage.saveInStorage('currentUser', userData);
    setUserData(userData);
  };

  const isJwtFresh = () => (currentUser.exp ? currentUser.exp > Date.now() / 1000 : false);

  const authorizeRequest = async () => {
    if (!isJwtFresh()) {
      return axios.post(
        `${process.env.REACT_APP_BASEURL}/api/auth/token/refresh-jwt/`,
        {},
        { withCredentials: true },
      ).then((res) => Promise.resolve(res))
        .catch((err) => {
          navigationHistory.push('/login/');

          return Promise.reject(err);
        });
    }

    return Promise.resolve();
  };

  const deauthenticateUser = () => {
    authorizeRequest().then((res) => axios.post(
      `${process.env.REACT_APP_BASEURL}/api/auth/token/logout/`,
      {},
      { withCredentials: true },
    ).then((res) => {
      clientStorage.removeFromStorage('currentUser');
      setUserData({});
      navigationHistory.push('/login/');

      return Promise.resolve(res);
    }));
  };

  const isAuthenticated = () => {
    const rteCookie = Cookies.get('rte');
    return !!rteCookie;
  };


  return (
    <UserContext.Provider value={{
      currentUser,
      isAuthenticated,
      authenticateUser,
      deauthenticateUser,
      isJwtFresh,
    }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
