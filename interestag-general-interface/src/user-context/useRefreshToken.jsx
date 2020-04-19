import React, {useContext, useState}from "react";
import axios from 'axios';

import { UserContext } from './UserContextProvider';

const useRefreshToken = () => {
  const [data, setData] = useState();
  const baseUrl = "http://localhost:8000/api/";
  const { handleRegister } = useContext(UserContext);

  const handleRefreshToken = () => {
      axios
        .post(`${baseUrl}auth/token/refresh-jwt/`, {})
        .then((res) => {
          console.log(res);
          handleRegister(res);
        })
        .catch((err) => console.log(err));
    
      return data;
  }

  return handleRefreshToken;
};

export {useRefreshToken}

