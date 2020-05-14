import React from 'react';

import Fab from '@material-ui/core/Fab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { TextField } from '@material-ui/core';
import { Divider } from '@material-ui/core';

import { InterestField } from './InterestField';

const CreateEventOverview = ({ eventDetails, interests, createEvent }) => {
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
        value={eventDetails['event_date']}
        disabled={true}
      />
      <h3>Event Interests</h3>
      <Divider />
      {interests.map(interest => (
        <InterestField {...interest} disabled={true} />
        
      ))}
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className="custom-fab-button"
        onClick={createEvent}>
        Create event
      </Fab>
    </div>

  )
}

export { CreateEventOverview };