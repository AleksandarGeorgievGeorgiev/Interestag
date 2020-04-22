import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

import { useLogin } from '../login/useLogin';

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
    exp: Date.now().valueOf() + 5*60000,
  }

  const cookie = `jwt=${window.btoa(JSON.stringify(jwt))}; expires=${Date().toString()}; Max-Age=300; Path=/`;
  
  return cookie;
}

const UserContextProvider = ({ children }) => {
  const [currentUser, setUserData] = useState({});
  const loginUser = useLogin();

  const userFromCookie = (response) => {
    const fakeCookie = createFakeCookie(response); //TEST only
    const userPayload = fakeCookie.split(';')[0].trim().split('=')[1];
    const userData = JSON.parse(window.atob(userPayload));

    setUserData(userData);
  };

  const isAuthenticated = () => {
    return currentUser.exp ? Date.now() < currentUser.exp : false;
  }

  return (
    <UserContext.Provider value={{ currentUser, userFromCookie, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
