// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import axios from 'axios';

import { UserContext } from './UserContextProvider';

const useTokenInterceptor = () => {
  const currentUser = useContext(UserContext);

  const attach = () => {
    console.log('attached');
    axios.interceptors.request.use((config) => {
      if (currentUser.exp < Date.now()) {
        // TODO: call refresh api
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
