import { useContext } from 'react';
import axios from 'axios';

import { UserContext } from './UserContextProvider';

const useRefreshToken = () => {
  const { authenticateUser, deauthenticateUser } = useContext(UserContext);

  const refreshToken = async () => axios
    .post(`${process.env.REACT_APP_BASEURL}/api/auth/token/refresh-jwt/`, {}, { withCredentials: true })
    .then((res) => authenticateUser(res))
    .catch((err) => deauthenticateUser());

  return refreshToken;
};

export { useRefreshToken };
