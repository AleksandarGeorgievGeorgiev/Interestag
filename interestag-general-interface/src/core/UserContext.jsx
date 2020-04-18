import React, { useState } from 'react';

import { useLogin } from '../login/useLogin';

const UserContext = React.createContext(
  {
    currentUser: {},
    handleLoginSubmit: () => {},
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

  return (
    <UserContext.Provider value={{ currentUser, handleLoginSubmit }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContextProvider, UserContext };
