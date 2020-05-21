import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventDetailsScreen = ({ eventId }) => {
  const [event, setEvent] = useState({});

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/event/${eventId}`)
      .then(res => setEvent(res.data));
  }, []);

  return (
    <div>
      
    </div>
  );
}

export { EventDetailsScreen };