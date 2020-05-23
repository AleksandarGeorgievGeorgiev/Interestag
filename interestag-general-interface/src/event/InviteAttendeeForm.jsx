import React from 'react'

import { TextField, Button } from '@material-ui/core';

import { useFormHandler } from '../register/useFormHandler';
const InviteAttendeeForm = ({ id: eventId }) => {
  const { handleChange, values } = useFormHandler();

  const sendInvite = () => {

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