import React, {useState, useEffect} from 'react'
import axios from 'axios'

import { TextField, Button } from '@material-ui/core';

import { useFormHandler } from '../register/useFormHandler';
const InviteAttendeeForm = (userdata) => {
  const { handleChange, values } = useFormHandler();
  
  const sendInvite = () => {
    console.log(userdata.attendance)
    console.log(userdata.eventId)
    console.log(values.attendee)
    axios
    .post(`${process.env.REACT_APP_BASEURL}/api/auth/find-user/`, {
      username: values.attendee,
    }).then(res => 
      axios
      .post(`${process.env.REACT_APP_BASEURL}/api/attendance/`, {
        user: res.data.id,
        event: userdata.eventId,
        invitation_status: userdata.attendace,
      })
      .then(res => console.log(res)))
  }

  return (
    <form>
      <TextField
          id="standard-description-flexible"
          name="attendee"
          label="Email/Username"
          value={values.attendee}
          onChange={handleChange}
        />
      <Button
        onClick={sendInvite}
        variant="contained"
        size="medium"
        color="secondary"
        style={{ marginTop: '15px', alignSelf: 'center' }}
      >
        Invite
      </Button>
    </form>
  );
}

export { InviteAttendeeForm };