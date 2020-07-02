/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Ripples from 'react-ripples';
import { Box, Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { UserContext } from '../user-context/UserContextProvider';
import { useProtectedApi } from '../core/useProtectedApi';

const useCss = makeStyles({
  editIcon: {
    padding: '0',
    cursor: 'pointer',
  },
  eventText: {
    cursor: 'pointer',
  },
});

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const navigationHistory = useHistory();
  const protectedApi = useProtectedApi();
  const css = useCss();
  const [ownEvents, setOwnEvents] = useState([]);

  useEffect(() => {
    protectedApi.get(`${process.env.REACT_APP_BASEURL}/api/event/`)
      .then((res) => {
        setOwnEvents(res.data);
      });
  }, []);

  const clickedEvent = (event) => {
    navigationHistory.push({
      pathname: `/event/${event.id}/`,
      state: { ...event },
    });
  };

  const clickedEventEdit = (event) => {
    navigationHistory.push({
      pathname: `/event/${event.id}/edit`,
      state: { ...event },
    });
  };

  return (
    <div className="body">
      <div>
        <h3>{currentUser.first_name} {currentUser.last_name}</h3>
        <div className="username">
          Username: {currentUser.username}
        </div>
        <div style={{ padding: '20px 15px' }}>
          {ownEvents.map((event) => (
            <Card key={event.id} style={{ marginTop: '10px' }}>
              <Box className="going-to-items" display="flex" justifyContent="center" alignItems="center">
                <Ripples onClick={() => clickedEvent(event)}>
                  <CardContent classes={{ root: css.eventText }}>
                    {event.name} | {new Date(event.event_date).toDateString()}
                  </CardContent>
                </Ripples>
                <EditIcon classes={{ root: css.editIcon }} onClick={() => clickedEventEdit(event)} />
              </Box>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Profile };
