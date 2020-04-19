import React, { useState, useContext } from 'react';

import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import GoogleButton from 'react-google-button';

import Header from '../core/Header';
//import { UserContext } from '../core/UserContext';

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
  //const { handleLoginSubmit } = useContext(UserContext);

  const handleInputChange = (event) => {
    event.persist();
    const input = {
      inputName: event.target.name,
      inputValue: event.target.value,
    };

    setUserCredentials({ ...userCredentials, [input.inputName]: input.inputValue });
  };

  return (
      <form>
        <TextField
          id="standard-username/email-flexible"
          name="userName"
          label="Username / Email"
          onChange={handleInputChange}
        />
        <br />
        <br />
        <TextField
          name="userPassword"
          label="Password"
          type="password"
          onChange={handleInputChange}
        />
        <br />
        <Button
          //onClick={() => handleLoginSubmit(userCredentials)}
          className="signin-button"
          style={styles.button}
        >
          Sign in
        </Button>
        <br />
        <GoogleButton
          type="dark"
          style={styles.googleButton}
        />
      </form>
  );
}

export default LoginForm;
