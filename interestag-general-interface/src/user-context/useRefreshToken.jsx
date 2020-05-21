import React, { useContext } from "react";
import axios from 'axios';

import { UserContext } from './UserContextProvider';

const useRefreshToken = () => {
  const { authenticateUser } = useContext(UserContext);

  const handleRefreshToken = () => {
    return axios
      .post(`${process.env.REACT_APP_BASEURL}/api/auth/token/refresh-jwt/`, {})
      .then((res) => authenticateUser(res))
      .catch((err) => Promise.reject(err));
  }

  return handleRefreshToken;
};

export { useRefreshToken }

