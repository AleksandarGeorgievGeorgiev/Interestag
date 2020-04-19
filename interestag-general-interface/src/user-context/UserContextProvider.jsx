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

const UserContextProvider = ({ children }) => {
  const [currentUser, setUserData] = useState({});
  const loginUser = useLogin();

  const handleLoginSubmit = (userCredentials) => {
    if (!currentUser.userId) {
      const userData = loginUser(userCredentials);

      setUserData(userData);
    }
  };

  const handleRegister = (response) => {
    const userPayload = 'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJ1c2VySWQiOiAyNCwgInVzZXJuYW1lIjogInNkYWFzYSIsICJwZXJtaXNzaW9ucyI6IFtdLCAiZXhwIjogMTU4NzMxNDIzN30.46a0764e75f1baa3a139292e4871a946826471e8ecf2e74e98efef03812fbe72';
    const userData = JSON.parse(window.atob(userPayload.split('.')[1].trim()));

    setUserData(userData);
  };

  return (
    <UserContext.Provider value={{ currentUser, handleLoginSubmit, handleRegister }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
