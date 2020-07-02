/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';

import {
  useParams, useHistory, Link,
} from 'react-router-dom';
import {
  Box,
  Divider,
  Button,
  ButtonGroup,
  SwipeableDrawer,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GradeIcon from '@material-ui/icons/Grade';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { InviteAttendeeForm } from './InviteAttendeeForm';
import { UserContext } from '../user-context/UserContextProvider';
import { InterestField } from './InterestField';

import { RateInterestsForm } from './RateInterestsForm';
import { useProtectedApi } from '../core/useProtectedApi';
import { DownloadPrintables } from './DownloadPrintables';

const ATTENDANCE_STATUS = {
  Pending: 1,
  Accepted: 2,
  Rejected: 3,
};

const useCss = makeStyles({
  eventDetailsScreen: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  eventDetails: {
    overflow: 'auto',
    padding: '0 15px',
  },
  eventActionBar: {
    overflow: 'hidden',
    // position: 'fixed',
    // bottom: '56px',
    backgroundColor: '#edeaf5',
    justifyContent: 'space-between',
    padding: '5px 12px',
    display: 'flex',
    // width: '100%',
    borderRadius: '7px',
    // marginLeft: '-15px',
    marginTop: 'auto',
  },
  rateInterestsButton: {
    color: '#ffd300',
    // color: '#a8509e',
  },
  goingSelected: {
    backgroundColor: '#69bd45',
  },
  notGoingSelected: {
    backgroundColor: '#ed1f24',
  },
  goingPending: {
    color: '#faa21a',
    borderColor: '#faa21a',
  },
  interestCard: {
    marginBottom: '5px',
  },
});

const EventDetailsScreen = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const [currentEvent, setCurrentEvent] = useState({});
  const [creator, setCreator] = useState({});
  const [attendanceStatus, setAttendanceStatus] = useState(0);
  const { state: eventFromHistory } = history.location;
  const { id: eventId } = useParams();
  const protectedApi = useProtectedApi();
  const [drawerOpen, setOpen] = useState(false);
  const [interestRatings, setInterestRatings] = useState({});
  const css = useCss();

  useEffect(() => {
    if (eventFromHistory) {
      setEventData(eventFromHistory);
    } else {
      protectedApi
        .get(`${process.env.REACT_APP_BASEURL}/api/event/${eventId}/`)
        .then((res) => {
          setEventData(res.data);
        });
    }
  }, []);

  const setEventData = (eventData) => {
    Promise.all([
      getCreatorData(eventData.creator),
      getAttendanceStatus(eventData.id),
    ]).then(([creator, attendance]) => {
      setCreator(creator);

      setAttendanceStatus(
        attendance.invitation_status || ATTENDANCE_STATUS.Rejected,
      );

      const eventAttendance = {
        id: attendance.id,
        user: attendance.user,
        userInterests: attendance.eventatendeeintereset_set,
      };

      setCurrentEvent({
        ...eventData,
        attendance: eventAttendance,
      });

      if (attendance.id !== undefined) {
        initializeRatings(eventAttendance);
      }
    });
  };

  const initializeRatings = (attendance) => {
    let scores = {};
    attendance.userInterests.forEach((interestRating) => {
      scores = {
        ...scores,
        [interestRating.interest]: interestRating.score,
      };
    });

    setInterestRatings(scores);
  };

  const getCreatorData = (creatorId) => protectedApi
    .get(`${process.env.REACT_APP_BASEURL}/api/auth/profile/${creatorId}/`)
    .then((creatorRes) => creatorRes.data);

  const getAttendanceStatus = (eventId) => protectedApi
    .get(`${process.env.REACT_APP_BASEURL}/api/event/going-to`)
    .then((attendanceRes) => {
      const attendanceFound = attendanceRes.data.find(
        ({ event: e }) => e.id === eventId,
      );

      return attendanceFound || {};
    });

  const joinEvent = () => {
    if (attendanceStatus === ATTENDANCE_STATUS.Pending) {
      protectedApi
        .patch(
          `${process.env.REACT_APP_BASEURL}/api/attendance/${currentEvent.attendance.id}/`,
          {
            invitation_status: ATTENDANCE_STATUS.Accepted,
          },
        )
        .then((res) => setAttendanceStatus(res.data.invitation_status));
    } else {
      protectedApi
        .post(`${process.env.REACT_APP_BASEURL}/api/attendance/`, {
          user: currentUser.userId,
          event: currentEvent.id,
          invitation_status: ATTENDANCE_STATUS.Accepted,
        })
        .then((res) => {
          const eventAttendance = {
            id: res.data.id,
            user: res.data.user,
          };
          setCurrentEvent({ ...currentEvent, attendance: eventAttendance });
          setAttendanceStatus(res.data.invitation_status);
        });
    }
  };

  const leaveEvent = () => {
    protectedApi
      .patch(
        `${process.env.REACT_APP_BASEURL}/api/attendance/${currentEvent.attendance.id}/`,
        {
          invitation_status: ATTENDANCE_STATUS.Rejected,
        },
      )
      .then((res) => setAttendanceStatus(res.data.invitation_status));
  };

  const deleteOnClick = (eventId) => {
    protectedApi
      .delete(
        `${process.env.REACT_APP_BASEURL}/api/event/${currentEvent.id}/`,
        {},
      )
      .then((res) => history.push({
        pathname: `/profile/${creator}`,
      }));
  };

  const isOwnEvent = () => currentEvent.creator === currentUser.userId;

  const ratingChanged = (interestId, newValue) => {
    const scores = {
      ...interestRatings,
      [interestId]: newValue,
    };

    setInterestRatings(scores);
  };

  const confirmRating = () => {
    Object.entries(interestRatings).forEach(([interestId, interestRating]) => {
      protectedApi
        .post('/api/event-attendee-interest/', {
          atendee: currentEvent.attendance.id,
          interest: interestId,
          score: interestRating,
        })
        .then(async (res) => {
          ratingChanged(res.data.interest, res.data.score);
          const updatedAttendance = await getAttendanceStatus(currentEvent.id);
          const eventAttendance = {
            id: updatedAttendance.id,
            user: updatedAttendance.user,
            userInterests: updatedAttendance.eventatendeeintereset_set,
          };

          setCurrentEvent({ ...currentEvent, attendance: eventAttendance });
        })
        .catch((err) => initializeRatings(currentEvent.attendance))
        .finally(() => setOpen(false));
    });
  };

  const cancelRating = () => {
    initializeRatings(currentEvent.attendance);
    setOpen(false);
  };


  return (
    <div className={css.eventDetailsScreen}>
      <Box className="download-edit-delete-button-group" display="flex" justifyContent="center">
        <DownloadPrintables
          currentUser={currentUser}
          attendeeInterests={currentEvent.attendance ? currentEvent.attendance.userInterests : []}
          eventInterests={currentEvent.interest_set}
          interestSelectionCount={currentEvent.interest_selection_count}
        />
        {isOwnEvent() && (
          <ButtonGroup style={{ marginLeft: 'auto' }}>
            <IconButton
              size="small"
              variant="contained"
              color="primary"
              component={Link}
              to={{
                pathname: `/event/${currentEvent.id}/edit/`,
                state: currentEvent,
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              variant="contained"
              color="primary"
              onClick={() => deleteOnClick(currentEvent.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ButtonGroup>
        )}
      </Box>
      <Box className={css.eventDetails}>
        <Divider />
        <Box display="flex" justifyContent="center">
          <h3>{currentEvent.name}</h3>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-around">
          {currentEvent.event_date
            && new Date(currentEvent.event_date).toDateString()}
          <span>{creator.username}</span>
        </Box>
        <p>{currentEvent.description}</p>
        <h3>Interests</h3>
        <Divider />
        {currentEvent.interest_set
          && currentEvent.interest_set.map((interest, index) => (
            <Card key={index} className={css.interestCard}>
              <div style={{
                background: `linear-gradient(90deg, ${interest.colour} ${(interestRatings[interest.id] || 0) * 10}%, #FFFFFF ${(interestRatings[interest.id] || 0) * 10}%)`,
              }}
              >
                <CardContent>
                  <InterestField {...interest} disabled />
                </CardContent>
              </div>
            </Card>
          ))}

        {isOwnEvent() && (
          <InviteAttendeeForm
            attendance={ATTENDANCE_STATUS.Pending}
            eventId={currentEvent.id}
            style={{ marginTop: '15px' }}
          />
        )}
        <SwipeableDrawer anchor="bottom" open={drawerOpen} onOpen={() => setOpen(true)} onClose={cancelRating}>
          <RateInterestsForm
            interests={currentEvent.interest_set}
            ratings={interestRatings}
            confirmRatings={confirmRating}
            cancelAction={cancelRating}
            ratingChangeHandler={ratingChanged}
          />
        </SwipeableDrawer>
      </Box>
      <Box className={css.eventActionBar}>
        <ButtonGroup variant="outlined" classes={attendanceStatus === ATTENDANCE_STATUS.Pending ? { groupedOutlined: css.goingPending } : {}}>
          <Button
            onClick={joinEvent}
            classes={{ contained: css.goingSelected }}
            variant={
              ATTENDANCE_STATUS.Accepted === attendanceStatus
                ? 'contained'
                : 'outlined'
            }
            size="large"
            color="primary"
          >
            Going
          </Button>
          <Button
            onClick={leaveEvent}
            classes={{ contained: css.notGoingSelected }}
            variant={
              ATTENDANCE_STATUS.Rejected === attendanceStatus
                ? 'contained'
                : 'outlined'
            }
            size="large"
            color="primary"
          >
            Not going
          </Button>
        </ButtonGroup>
        {ATTENDANCE_STATUS.Accepted === attendanceStatus
          && <Button onClick={() => setOpen(true)}><GradeIcon className={css.rateInterestsButton} /></Button>}
      </Box>
    </div>
  );
};

export { EventDetailsScreen };
