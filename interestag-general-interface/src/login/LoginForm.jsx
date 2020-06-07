import React, { useState, useContext } from 'react';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FacebookLogin from 'react-facebook-login';

import { UserContext } from '../user-context/UserContextProvider';
import { useProtectedApi } from '../core/useProtectedApi';

const styles = {
  button: {
    margin: 15,
  },
  googleButton: {
    float: 'none',
    position: 'static',
    display: 'block',
    margin: 'auto',
  },
};

function LoginForm() {
  const [userCredentials, setUserCredentials] = useState();
  const { authenticateUser } = useContext(UserContext);
  const navigationHistory = useHistory();
  const protectedApi = useProtectedApi();

  const handleInputChange = (event) => {
    event.persist();
    const input = {
      inputName: event.target.name,
      inputValue: event.target.value,
    };

    setUserCredentials({ ...userCredentials, [input.inputName]: input.inputValue });
  };

  const handleLoginSubmit = () => {
    axios.post(`${process.env.REACT_APP_BASEURL}/api/auth/login/`, userCredentials, { withCredentials: true })
      .then((res) => { authenticateUser(res); navigationHistory.push('/') })
      .catch((err) => console.log(err));
  };

  const responseFacebook = (response) => {
    const body = {
      userId: response.userID,
      accessToken: response.accessToken
    }
    
    axios.post(`${process.env.REACT_APP_BASEURL}/api/auth/facebook-auth/`, body, {withCredentials: true})
      .then((res) => { authenticateUser(userCredentials); navigationHistory.push('/') })
      .catch((err) => console.log(err));
  }

  return (
    <form>
      <TextField
        id="standard-username/email-flexible"
        name="username"
        label="Username / Email"
        onChange={handleInputChange}
      />
      <br />
      <br />
      <TextField
        name="password"
        label="Password"
        type="password"
        onChange={handleInputChange}
      />
      <br />
      <Button
        onClick={handleLoginSubmit}
        className="custom-fab-button"
        style={styles.button}
      >
        Sign in
      </Button>
      <br />
      <FacebookLogin 
        appId="2529177343987074"
        autoLoad = {false}
        fields="name,email,picture"
        callback={responseFacebook}
        size="small"
        textButton="Continue with Facebook"
        icon="fab fa-facebook-f"
        version="3.1"
      />
    </form>
  );
}

export { LoginForm };
