import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import GoogleButton from 'react-google-button';

import Header from '../core/Header';

function LoginForm({ handleLoginSubmit }) {
  const [userCredentials, setUserCredentials] = useState();

  const handleInputChange = (event) => {
    event.persist();
    const input = {
      inputName: event.target.name,
      inputValue: event.target.value,
    };

    setUserCredentials({ ...userCredentials, [input.inputName]: input.inputValue });
  };

  return (
    <MuiThemeProvider>
      <form>
        <Header />
        <br />
        <br />
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
          onClick={() => handleLoginSubmit(userCredentials)}
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
    </MuiThemeProvider>
  );
}

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

export default LoginForm;
