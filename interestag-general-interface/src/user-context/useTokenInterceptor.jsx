// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import axios from 'axios';

import { UserContext } from './UserContextProvider';

const useTokenInterceptor = () => {
  const { currentUser } = useContext(UserContext);

  const attach = () => {
    axios.interceptors.request.use((config) => {
      if (!currentUser.exp || currentUser.exp < Date.now()) {
        // TODO: call refresh api
        console.log('refresh me', currentUser);
      }
      return config;
    }, (error) => {
      // TODO: Does refresh return not 2xx response?
      console.log('rejected');
      return Promise.reject(error);
    });
  };

  return {
    attach,
  };
};

export { useTokenInterceptor };
