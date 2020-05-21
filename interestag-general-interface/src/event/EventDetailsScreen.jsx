import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Divider, Button, ButtonGroup } from '@material-ui/core';

import { InterestField } from './InterestField';
import { UserContext } from '../user-context/UserContextProvider';

const ATTENDANCE_STATUS = {
  Pending: 1,
  Accepted: 2,
  Rejected: 3,
}

const EventDetailsScreen = () => {
  const { currentUser } = useContext(UserContext);
  const [event, setEvent] = useState({});
  const [creator, setCreator] = useState({});
  const [status, setStatus] = useState(0);
  const { id: eventIdslug } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/event/${eventIdslug}`)
      .then(async res => {
        const event = res.data;

        await axios.get(`${process.env.REACT_APP_BASEURL}/api/auth/profile/${event.creator}`)
          .then(creatorRes => setCreator(creatorRes.data));

        axios.get(`${process.env.REACT_APP_BASEURL}/api/event/going_to`)
          .then(attendanceRes => {
            const eventFound = attendanceRes.data.find(e => e.id === event.id);

            if (eventFound) {
              setStatus(2);
            } else {
              setStatus(1);
            }
          })
        setEvent(event);
      });
  }, []);

  const joinEvent = () => {
    axios.post(`${process.env.REACT_APP_BASEURL}/api/attendance/`, {
      user: currentUser.userId,
      event: event.id,
      invitation_status: 2,
    }).then(res => setStatus(2));
  }

  return (
    <Box className="body" display="flex" flexDirection="column">
      <h3>{event.name}</h3>
      <Divider />
      <Box display="flex" justifyContent="space-around">
        {event.event_date && new Date(event.event_date).toDateString()}
        <span>{creator.username}</span>
      </Box>
      <p>{event.description}</p>
      <h3>Interests</h3>
      <Divider />
      {event.interest_set && event.interest_set.map((interest, index) =>
        <InterestField key={index} {...interest} disabled={true} />
      )}
      <Divider />
      <Box>
        <ButtonGroup variant="outlined">
          <Button
            onClick={joinEvent}
            style={{ marginTop: '15px' }}
            variant={ATTENDANCE_STATUS.Accepted === status ? 'contained' : 'outlined'}
            size="large"
            color="primary"
          >
            Going
          </Button>
          <Button
            onClick={joinEvent}
            style={{ marginTop: '15px' }}
            variant={ATTENDANCE_STATUS.Rejected === status ? 'contained' : 'outlined'}
            size="large"
            color="primary"
          >
            Not going
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export { EventDetailsScreen };
