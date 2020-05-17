// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';

import axios from 'axios';
import { Redirect, useHistory } from 'react-router-dom';
import { UserContext } from './UserContextProvider';
import { useRefreshToken } from './useRefreshToken';

const useTokenInterceptor = () => {
  const { currentUser, isAuthenticated } = useContext(UserContext);
  const handleRefreshToken = useRefreshToken();
  const navigationHistory = useHistory();
  let activeInterceptor = {};

  const attachInterceptor = () => {
    activeInterceptor = axios.interceptors.request.use((config) => {
      if(config.url.includes('/auth/login/') 
        || config.url.includes('/auth/register/')
        || config.url.includes('/auth/token/refresh-jwt/')
        || config.url.includes('/api/auth/facebook-auth/')) {
          
          return config;
      }
      
      if (!isAuthenticated()) {
        return handleRefreshToken()
          .then((res) => config)
          .catch((err) => {
              navigationHistory.push('/login/');
              
              return Promise.reject(err);
            });
      }

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
