// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';

import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { UserContext } from './UserContextProvider';
import { useRefreshToken } from './useRefreshToken';

const useTokenInterceptor = () => {
  const { currentUser, isAuthenticated } = useContext(UserContext);
  const handleRefreshToken = useRefreshToken();
  let activeInterceptor = {};

  const attachInterceptor = () => {
    activeInterceptor = axios.interceptors.request.use((config) => {
      
      // if (!isAuthenticated) {
         
      // }
      console.log(config);
      console.log('intercept');
      // handleRefreshToken();
          // .then((res) => res.config)
          // .catch((err) => (<Redirect to="/login/" />)); // navigate to login

      return config;
    }, (err) => Promise.reject(err));
  };

  const detachInterceptor = () => {
    axios.interceptors.request.eject(activeInterceptor);
  }

  return {
    attachInterceptor,
    detachInterceptor,
  };
};

export { useTokenInterceptor };
