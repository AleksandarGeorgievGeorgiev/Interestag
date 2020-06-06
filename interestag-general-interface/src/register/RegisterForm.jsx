import React, { useState, useContext } from 'react';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
// import AccountChooseList from './AccountChooseList';

import { useFormHandler } from './useFormHandler';
import validate from './validateRegister';
import { UserContext } from '../user-context/UserContextProvider';
import { TextField } from '@material-ui/core';
import { useProtectedApi } from '../core/useProtectedApi';

function RegisterForm() {
  const {
    handleChange, handleSubmit, values, errors,
  } = useFormHandler(
    submit,
    validate,
  );
  const { authenticateUser } = useContext(UserContext);
  const navigationHistory = useHistory();
  const protectedApi = useProtectedApi();

  function submit() {
    protectedApi
      .post(`${process.env.REACT_APP_BASEURL}/api/auth/register/`, values)
      .then((res) => { authenticateUser(values); navigationHistory.push('/') })
      .catch((err) => console.log(err));
  }

  return (
    <form autoComplete="off">
      <TextField
        id="standard-username-flexible"
        name="username"
        label="Username"
        value={values.username}
        onChange={handleChange}
        type="text"
        autoComplete="off"
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
        autoComplete="off"
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
        autoComplete="off"
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
        autoComplete="off"
      />
      {errors.confirmPassword && (
        <Alert className="alert" severity="error">
          {errors.confirmPassword}
        </Alert>
      )}
      <br />
      <br />
      {/* <AccountChooseList /> */}
      <Button className="custom-fab-button" onClick={handleSubmit}>
        Register
      </Button>
      <br />
    </form>
  );
}

export { RegisterForm };
