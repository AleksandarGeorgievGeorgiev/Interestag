import React from 'react';

import Fab from '@material-ui/core/Fab';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { TextField } from '@material-ui/core';
import { Divider } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

import { InterestField } from './InterestField';

const CreateEventOverview = ({ eventDetails, interests, createEvent, prevStep }) => {
  return (
    <div>
      <h3>Event Details</h3>
      <Divider />
      <TextField
        name="name"
        label="Event Name"
        value={eventDetails.name}
        disabled={true}
      />
      <TextField
        name="description"
        label="Description"
        value={eventDetails.description}
        disabled={true}
      />
      <TextField
        name="date"
        label="Date"
        type="datetime-local"
        value={eventDetails.eventDate}
        disabled={true}
      />
      <h3>Event Interests</h3>
      <Divider />
      {interests.map((interest, index) => (
        <InterestField key={index} {...interest} disabled={true} />
      ))}
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={'custom-fab-button'}
        onClick={prevStep}>
        <ArrowBackIosIcon style={{ color: '#fff' }} fontSize={'small'} />
        Back
      </Fab>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={'custom-fab-button'}
        onClick={createEvent}>
        Create event
        <DoneIcon style={{ color: '#fff' }} fontSize={'small'} />
      </Fab>
    </div>

  )
}

export { CreateEventOverview };