import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Divider } from '@material-ui/core';

import { InterestField } from './InterestField';

const EventDetailsScreen = () => {
  const [event, setEvent] = useState({});
  const [creator, setCreator] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/event/${id}`)
      .then(async res => 
        {
          const event = res.data;

          await axios.get(`${process.env.REACT_APP_BASEURL}/api/auth/profile/${event.creator}`)
          .then(creatorRes => setCreator(creatorRes.data));

          setEvent(event);
        });
  }, []);

  return (
    <Box className="body" display="flex" flexDirection="column">
      <h3>{event.name}</h3>
      <Divider />
      <Box display="flex" justifyContent="space-around">
        {event.event_date && new Date(event.event_date).toDateString()}
        <span>{creator.username}</span>
        {event.description}
      </Box>
      <h3>Interests</h3>
      <Divider />
      {event.interest_set && event.interest_set.map((interest, index) =>
        <InterestField key={index} {...interest} disabled={true} />
      )}
    </Box>
  );
}

export { EventDetailsScreen };
