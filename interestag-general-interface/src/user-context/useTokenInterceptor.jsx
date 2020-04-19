// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import axios from 'axios';

import { UserContext } from './UserContextProvider';
import { useRefreshToken } from './useRefreshToken';

const useTokenInterceptor = () => {
  const { currentUser } = useContext(UserContext);
  const handleRefreshToken = useRefreshToken();

  const attach = () => {
    axios.interceptors.request.use((config) => {
      if (currentUser.exp < Date.now()) {
        handleRefreshToken();
        console.log('refreshed');
      }
      return config;
    }, (error) => {
      console.log('rejected');
      return Promise.reject(error);
    });
  };

  return {
    attach,
  };
};

export { useTokenInterceptor };
