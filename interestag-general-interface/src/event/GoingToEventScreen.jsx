import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Ripples from 'react-ripples';
import WarningIcon from '@material-ui/icons/Warning';
import { Box } from '@material-ui/core';

import { useProtectedApi } from '../core/useProtectedApi';

const GoingToEventScreen = () => {
  const [events, setEvents] = useState([]);
  const navigationHistory = useHistory();
  const protectedApi = useProtectedApi();

  useEffect(() => {
    protectedApi
      .get(`${process.env.REACT_APP_BASEURL}/api/event/going-to/`)
      .then((res) => {
        setEvents(res.data);
      });
  }, []);


  const clickedEvent = (event) => {
    navigationHistory.push({
      pathname: `/event/${event.id}/`,
      state: { ...event.event },
    });
    console.log(events.sort((a, b) => a.invitation_status - b.invitation_status));
  };

  return (
    <div style={{ padding: '20px 15px' }}>
      <div>
        {events.sort((a, b) => a.invitation_status - b.invitation_status).map((event, index) => (
          event.invitation_status === 1
            ? (
              <Card key={event.id} style={{ marginBottom: '10px' }}>
                <div className="pending-items">
                  <Ripples>
                    <CardContent onClick={() => clickedEvent(event)}>
                      <Box display="flex" justifyContent="center">
                        <div>
                          {event.event.name}
                          {' '}
                          |
                          {' '}
                          {new Date(event.event.event_date).toDateString()}
                          {' '}
                        </div>
                        <div><WarningIcon className="pending-icon" /></div>
                      </Box>
                    </CardContent>
                  </Ripples>
                </div>
              </Card>
            )
            : (
              <Card key={event.id} style={{ marginBottom: '10px' }}>
                <div className="going-to-items">
                  <Ripples>
                    <CardContent onClick={() => clickedEvent(event)}>
                      <div>
                        {event.event.name}
                        {' '}
                        |
                        {' '}
                        {new Date(event.event.event_date).toDateString()}
                      </div>
                    </CardContent>
                  </Ripples>
                </div>
              </Card>
            )))}
      </div>
    </div>
  );
};

export { GoingToEventScreen };
