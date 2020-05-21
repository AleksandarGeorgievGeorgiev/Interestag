import React, { useContext, useState } from "react";
import axios from 'axios';

import { UserContext } from './UserContextProvider';

const useRefreshToken = () => {
  const [data, setData] = useState();
  const baseUrl = "http://localhost:8000/api/";
  const { authenticateUser } = useContext(UserContext);

  const handleRefreshToken = () => {
    return axios
      .post(`${baseUrl}auth/token/refresh-jwt/`, {})
      .then((res) => authenticateUser(res))
      .catch((err) => Promise.reject(err));
  }

  return handleRefreshToken;
};

export { useRefreshToken }

