import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';

import DateFnsUtils from '@date-io/date-fns';
import { UserContext } from '../user-context/UserContextProvider';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { DateTimePicker } from "@material-ui/pickers";
import Select from '@material-ui/core/Select';

function CreateEventForm({ handleChange, handleSubmit, values, errors }) {
  
  const baseUrl = 'http://localhost:8000/api/';
  const { authenticateUser } = useContext(UserContext);
  const navigationHistory = useHistory();

  function submit() {
    // axios
    //     // .post(`${baseUrl}auth/register/`, values)
    //     // .then((res) => { authenticateUser(values); navigationHistory.push('/') })
    //     // .catch((err) => console.log(err));
  }

  return (
    <>
      <TextField
        id="standard-description-flexible"
        name="name"
        multiline
        label="Event Name"
        value={values.name}
        onChange={handleChange}
      />
      <br />
      <br />
      <TextField
        id="standard-multiline-static"
        label="Multiline"
        multiline
        name="description"
        label="Description"
        value={values.description}
        onChange={handleChange}
      />
      <br />
      <br />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          label="DateTimePicker"
          name="event_date"
          value={values['event_date']} onChange={date => handleChange({ target: { name: 'event_date', value: date.toString() }})}
        />
      </MuiPickersUtilsProvider>
      <br />
      <br />
      <InputLabel id="demo-simple-select-helper-label">Event publicity</InputLabel>
      <Select
        native
        value={values.publicity}
        onChange={handleChange}
        name="publicity"
        inputProps={{
          id: 'age-native-required',
        }}
      >
        <option value={0}>Public</option>
        <option value={1}>Private</option>
        <option value={2}>Unlisted</option>
      </Select>
    </>
  )
}

export { CreateEventForm }