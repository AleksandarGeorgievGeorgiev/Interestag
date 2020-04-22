import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { Button } from '@material-ui/core';

import { UserContext } from '../user-context/UserContextProvider';
import { useHistory } from 'react-router-dom';
import { Header } from '../core/Header';

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const [hello, setHello] = useState('Waiting For Message...');
  const testApi = () => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/test`)
      .then((res) => setHello(res.data))
      .catch((err) => console.log(err));
  };

  const history = useHistory();
  // attach();
  useEffect(() => {
    return history.listen((location) => console.log(location));
  });

  return (
    <div className="body">
      <Header />
      <h1>Home</h1>
      {hello}
      <br />
      <Button color="secondary" variant="contained" onClick={testApi}>Test Me</Button>
    </div>
  );
};

export { Home };
