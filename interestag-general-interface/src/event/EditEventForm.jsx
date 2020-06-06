import React, { useState, useContext, useEffect } from 'react'

import { useHistory, useParams } from 'react-router-dom';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DateTimePicker } from "@material-ui/pickers";
import Fab from '@material-ui/core/Fab';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';
import { TextField, FormControl, Divider, Button, Box } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import { InterestField } from './InterestField';
import { useProtectedApi } from '../core/useProtectedApi';

const INTEREST_STATUS = {
  Created: 0,
  Deleted: 1,
}

function EditEventForm() {
  const history = useHistory();
  const { id: eventId } = useParams();
  const { state: eventFromHistory } = history.location;
  const [eventDetails, setEventDetails] = useState({
    name: '',
    description: '',
    event_date: '',
    interest_selection_count: '',
    publicity: '',
  });
  const [interests, setInterests] = useState([]);
  const protectedApi = useProtectedApi();

  useEffect(() => {
    if (eventFromHistory) {
      const eventData = {
        name: eventFromHistory.name,
        description: eventFromHistory.description ? eventFromHistory.description : '',
        event_date: new Date(eventFromHistory.event_date),
        interest_selection_count: eventFromHistory.interest_selection_count,
        publicity: eventFromHistory.publicity,
      };

      setInterests(eventFromHistory.interest_set)
      setEventDetails(eventData);
    }
    else {
      protectedApi
        .get(`${process.env.REACT_APP_BASEURL}/api/event/${eventId}`)
        .then(res => {
          const eventData = {
            name: res.data.name,
            description: res.data.description ? res.data.description : '',
            event_date: new Date(res.data.event_date),
            interest_selection_count: res.data.interest_selection_count,
            publicity: res.data.publicity,
          }
          const interests = res.data.interest_set;

          setInterests(interests);
          setEventDetails(eventData);
        });
    }
  }, []);

  const handleEventChange = (event) => {
    event.persist();
    const input = {
      inputName: event.target.name,
      inputValue: event.target.value,
    };

    setEventDetails({ ...eventDetails, [input.inputName]: input.inputValue });
  }

  const addInterest = () => {
    const tempInterests = interests.slice();
    tempInterests.push({ name: '', color: '', status: INTEREST_STATUS.Created });

    setInterests(tempInterests);
  }

  const deleteInterest = (index) => {
    const tempInterests = interests.slice();
    if (tempInterests[index].status !== INTEREST_STATUS.Created) {
      tempInterests[index].status = INTEREST_STATUS.Deleted;
    }

    setInterests(tempInterests);
  }

  const interestValueChanged = (index, value) => {
    const tempInterests = interests.slice();

    tempInterests[index] = { ...tempInterests[index], ...value }

    setInterests(tempInterests);
  }

  const parseDate = (dateObject) => {
    return `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()}T${dateObject.getHours()}:${dateObject.getMinutes()}`;
  }

  const updateEvent = () => {
    return protectedApi.put(`${process.env.REACT_APP_BASEURL}/api/event/${eventId}/`, {
      'name': eventDetails.name,
      'description': eventDetails.description,
      'event_date': parseDate(eventDetails.event_date),
      'interest_selection_count': eventDetails.interest_selection_count,
      'publicity': eventDetails.publicity
    });
  }

  const deleteInterests = () => {
    const deletedInterests = interests.filter(interest => interest.status === INTEREST_STATUS.Deleted);
    const promises = [];

    deletedInterests.forEach(interest => {
      const promise = protectedApi.delete(`${process.env.REACT_APP_BASEURL}/api/interest/${interest.id}/`);

      promises.push(promise);
    });

    return Promise.all(promises);
  }

  const createInterests = () => {
    const createdInterests = interests.filter(interest => interest.status === INTEREST_STATUS.Created);

    return protectedApi.post(`${process.env.REACT_APP_BASEURL}/api/interest/create_many/`,
      createdInterests.map(interest => {
        return {
          event: eventId,
          name: interest.name,
          colour: interest.colour,
        }
      }
      ));
  }

  const editDone = () => {
    Promise
      .all([updateEvent(), createInterests(), deleteInterests()])
      .then(res => history.push(`/event/${eventId}`));
  }

  return (
    <form>
      <h3>Event Details</h3>
      <Divider />
      <TextField
        name="name"
        label="Event Name"
        value={eventDetails.name}
        onChange={handleEventChange}
      />
      <TextField
        name="description"
        label="Description"
        value={eventDetails.description}
        onChange={handleEventChange}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          label="Date"
          ampm={false}
          autoOk={true}
          disablePast={true}
          format={'yyyy-MM-dd hh:mm'}
          value={eventDetails.еvent_date}
          onChange={date => { setEventDetails({ ...eventDetails, event_date: date }) }}
        />
      </MuiPickersUtilsProvider>
      <FormControl>
        <TextField
          name="interest_selection_count"
          label="Interests on badge"
          type="number"
          value={eventDetails.interest_selection_count}
          onChange={handleEventChange}
        />
      </FormControl>
      <br />
      <br />
      <FormControl>
        <InputLabel htmlFor="event_publicity">Event publicity</InputLabel>
        <Select
          native
          id="event_publicity"
          value={eventDetails.publicity}
          onChange={handleEventChange}
          name="publicity"
        >
          <option value=""></option>
          <option value={1}>Public</option>
          <option value={2}>Private</option>
          <option value={3}>Unlisted</option>
        </Select>
      </FormControl>
      <h3>Event Interests</h3>
      <Divider />
      {interests.map((interest, index) => { 
        if(interest.status !== INTEREST_STATUS.Deleted) {
          return (
            <InterestField
              key={index}
              {...interest}
              index={index}
              valueChanged={interestValueChanged}
              deleteInterest={deleteInterest}
            />
          )
        }
      })}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          variant="contained"
          disableElevation
          style={{ width: '100px', margin: '5px 5px' }}
          onClick={addInterest}
        >
          <AddIcon />
        </Button>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          className={'custom-fab-button'}
          onClick={history.goBack}
        >
          <ArrowBackIosIcon style={{ color: '#fff' }} fontSize={'small'} />
        Back
      </Fab>
        <Fab
          variant="extended"
          size="medium"
          color="primary"
          aria-label="add"
          className={'custom-fab-button'}
          onClick={editDone}
        >
          Update event
        <DoneIcon style={{ color: '#fff' }} fontSize={'small'} />
        </Fab>
      </Box>

    </form>
  );
}

export { EditEventForm }