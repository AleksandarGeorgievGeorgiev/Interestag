import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { UserContext } from '../core/UserContext';

const useApi = () => {
  const [data, setData] = useState('Waiting for message...');
  const baseurl = 'http://192.168.0.101:8000';

  useEffect(() => {
    axios.get(`${baseurl}/api/test`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  });

  return data;
};

const Home = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <h1>Home</h1>
      {currentUser.userId && 'Welcome'}
      <pre>{`${useApi()}`}</pre>
    </div>
  );
};

export { Home };
