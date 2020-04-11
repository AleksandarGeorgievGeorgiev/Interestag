import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const Home = () => (
  <div>
    <h1>Home</h1>
    <pre>{`${useApi()}`}</pre>
  </div>
);

export { Home };
