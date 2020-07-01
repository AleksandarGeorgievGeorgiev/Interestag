import React, { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../user-context/UserContextProvider';
import logo from '../resources/TestGraphTablet.png';
import { useProtectedApi } from '../core/useProtectedApi';

const useCss = makeStyles({
  home: {
    paddingTop: '45%',
  }
})

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const [hello, setHello] = useState('Waiting For Message...');
  const protectedApi = useProtectedApi();
  const css =  useCss()

  // const testApi = () => {
  //   protectedApi.get(`${process.env.REACT_APP_BASEURL}/api/test`)
  //     .then((res) => setHello(res.data))
  //     .catch((err) => console.log(err));
  // };

  return (
    <div className={css.home}>
      <img src={logo} alt="Logo" className="home-logo" />
    </div>
  );
};

export { Home };
