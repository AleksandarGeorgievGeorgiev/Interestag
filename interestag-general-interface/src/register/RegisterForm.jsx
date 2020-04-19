import React, { useState, useContext } from "react";
import axios from 'axios';

import AccountChooseList from "./AccountChooseList";
import {useRegister} from "./useRegister";
import validate from "./validateRegister";

import TextField from "@material-ui/core/TextField";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { UserContext } from '../user-context/UserContextProvider';

function RegisterForm() {
  const { handleChange, handleSubmit, values, errors } = useRegister(
    submit,
    validate
  );
  const [data, setData] = useState();
  const baseUrl = "http://localhost:8000/api/";
  const { handleRegister } = useContext(UserContext);

  function submit() {
    // TODO: fix values
    handleRegister({});
    axios
      .post(`${baseUrl}auth/register/`, values)
      .then((res) => { console.log(res); handleRegister(res); })
      .catch((err) => console.log(err));

    return data;
  }

  return (
    <form>
      <TextField
        id="standard-userName-flexible"
        name="username"
        label="username"
        value={values.username}
        onChange={handleChange}
        multiline
        rowsMax="4"
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
        label="email"
        value={values.email}
        onChange={handleChange}
        multiline
        rowsMax="4"
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
        label="password"
        value={values.password}
        onChange={handleChange}
        multiline
        rowsMax="4"
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
        label="confirm password"
        value={values.password_confirm}
        onChange={handleChange}
        multiline
        rowsMax="4"
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
        Save
      </Button>
      <br />
    </form>
  );
}

export default RegisterForm;
