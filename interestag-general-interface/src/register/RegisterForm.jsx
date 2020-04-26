import React, { useState, useContext } from 'react';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
// import AccountChooseList from './AccountChooseList';

import { useRegister } from './useRegister';
import validate from './validateRegister';
import { UserContext } from '../user-context/UserContextProvider';
import { TextField } from '@material-ui/core';

function RegisterForm() {
  const {
    handleChange, handleSubmit, values, errors,
  } = useRegister(
    submit,
    validate,
  );
  const baseUrl = 'http://localhost:8000/api/';
  const { authenticateUser } = useContext(UserContext);
  const navigationHistory = useHistory();

  function submit() {
    axios
      .post(`${baseUrl}auth/register/`, values)
      .then((res) => { authenticateUser(values); navigationHistory.push('/') })
      .catch((err) => console.log(err));
  }

  return (
    <form>
      <TextField
        id="standard-username-flexible"
        name="username"
        label="Username"
        value={values.username}
        onChange={handleChange}
        type="text"
      />
      <br />
      {errors.username && (
        <Alert className="alert" severity="error">
          {errors.username}
        </Alert>
      )}
      <TextField
        id="standard-email-flexible"
        name="email"
        label="E-mail"
        value={values.email}
        onChange={handleChange}
        type="email"
      />
      <br />
      {errors.email && (
        <Alert className="alert" severity="error">
          {errors.email}
        </Alert>
      )}
      <TextField
        id="standard-password-flexible"
        name="password"
        label="Password"
        value={values.password}
        onChange={handleChange}
        type="password"
      />
      <br />
      {errors.password && (
        <Alert className="alert" severity="error">
          {errors.password}
        </Alert>
      )}
      <TextField
        id="standard-passwordConfirm-flexible"
        name="password_confirm"
        label="Confirm Password"
        value={values.password_confirm}
        onChange={handleChange}
        type="password"
      />
      {errors.confirmPassword && (
        <Alert className="alert" severity="error">
          {errors.confirmPassword}
        </Alert>
      )}
      <br />
      <br />
      {/* <AccountChooseList /> */}
      <Button className="signup-button" onClick={handleSubmit}>
        Register
      </Button>
      <br />
    </form>
  );
}

export { RegisterForm };
