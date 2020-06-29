import React, { useState, useEffect, useContext } from "react";

import { useParams, useHistory, Link } from "react-router-dom";
import {
  Box,
  Divider,
  Button,
  ButtonGroup,
  TextField,
  SwipeableDrawer,
  Slider,
  Paper
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import { InterestField } from "./InterestField";
import GetAppIcon from '@material-ui/icons/GetApp';
import { UserContext } from "../user-context/UserContextProvider";
import { InviteAttendeeForm } from "./InviteAttendeeForm";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { Redirect } from "react-router-dom";

import { RateInterestsForm } from './RateInterestsForm';
import { useProtectedApi } from "../core/useProtectedApi";
import { DownloadPrintables } from './DownloadPrintables';

const ATTENDANCE_STATUS = {
  Pending: 1,
  Accepted: 2,
  Rejected: 3,
};

const useCss = makeStyles({
  eventActionBar: {
    overflow: 'hidden',
    position: 'fixed',
    bottom: '56px',
    backgroundColor: '#edeaf5',
    justifyContent: 'space-between',
    padding: '4px 8px',
    display: 'flex',
    width: '100%',
    margin: '0 -15px',
  },
  rateInterestsButton: {
    color: '#a8509e',
  },
  goingSelected: {
    backgroundColor: '#69bd45'
  },
  notGoingSelected: {
    backgroundColor: '#ed1f24',
  },
  goingPending: {
    color: '#faa21a',
    borderColor: '#faa21a',
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
  const [eventAttendanceData, setEventAttendanceData] = useState({});
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
        attendance.invitation_status || ATTENDANCE_STATUS.Rejected
      );

      const eventAttendance = {
        id: attendance.id,
        user: attendance.user,
        userInterests: attendance.eventatendeeintereset_set,
      };

      setEventAttendanceData(eventAttendance)

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
    attendance.userInterests.forEach(interestRating => {
      scores = {
        ...scores,
        [interestRating.interest]: interestRating.score,
      };
    });

    setInterestRatings(scores);
  }

  const getCreatorData = (creatorId) => {
    return protectedApi
      .get(`${process.env.REACT_APP_BASEURL}/api/auth/profile/${creatorId}/`)
      .then((creatorRes) => creatorRes.data);
  };

  const getAttendanceStatus = (eventId) => {
    return protectedApi
      .get(`${process.env.REACT_APP_BASEURL}/api/event/going-to`)
      .then((attendanceRes) => {
        const attendanceFound = attendanceRes.data.find(
          ({ event: e }) => e.id === eventId
        );

        return attendanceFound || {};
      });
  };

  const joinEvent = () => {
    if (attendanceStatus === ATTENDANCE_STATUS.Pending) {
      protectedApi
        .patch(
          `${process.env.REACT_APP_BASEURL}/api/attendance/${currentEvent.attendance.id}/`,
          {
            invitation_status: ATTENDANCE_STATUS.Accepted,
          }
        )
        .then((res) => setAttendanceStatus(res.data.invitation_status));
    }
    else {
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
        }
      )
      .then((res) => setAttendanceStatus(res.data.invitation_status));
  };

  const deleteOnClick = (eventId) => {
    protectedApi
      .delete(
        `${process.env.REACT_APP_BASEURL}/api/event/${currentEvent.id}/`,
        {}
      )
      .then((res) =>
        history.push({
          pathname: `/profile/${creator}`,
        })
      );
  };

  const isOwnEvent = () => {
    return currentEvent.creator === currentUser.userId;
  };

  const ratingChanged = (interestId, newValue) => {
    const scores = {
      ...interestRatings,
      [interestId]: newValue
    }

    setInterestRatings(scores);
  }

  const confirmRating = () => {
    for (let [interestId, interestRating] of Object.entries(interestRatings)) {
      protectedApi
        .post('/api/event-attendee-interest/', {
          atendee: currentEvent.attendance.id,
          interest: interestId,
          score: interestRating,
        }) //TODO .then(update event attendance with new eventattendeeinterest_set)
        .catch(err => initializeRatings(currentEvent.attendance))
        .finally(() => setOpen(false));
    }
  }

  const cancelRating = () => {
    initializeRatings(currentEvent.attendance);
    setOpen(false);
  }


  return (
    <Box className="body" display="flex" flexDirection="column">
      <Box display="flex" justifyContent="center">
        <h3>{currentEvent.name}</h3>
        {isOwnEvent() && (
          <ButtonGroup style={{ marginLeft: "auto" }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              component={Link}
              to={{
                pathname: `/event/${currentEvent.id}/edit/`,
                state: currentEvent,
              }}
            >
              Edit
            </Button>
            ,
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => deleteOnClick(currentEvent.id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        )}
      </Box>

      <Divider />
      <Box display="flex" justifyContent="space-around">
        {currentEvent.event_date &&
          new Date(currentEvent.event_date).toDateString()}
        <span>{creator.username}</span>
      </Box>
      <p>{currentEvent.description}</p>
      <h3>Interests</h3>
      <Divider />
      {currentEvent.interest_set &&
        currentEvent.interest_set.map((interest, index) => (
          <Card key={index}>
            <div style={{
              background: `linear-gradient(90deg, ${interest.colour} ${(interestRatings[interest.id] || 0) * 10}%, #FFFFFF ${(interestRatings[interest.id] || 0) * 10}%)`
            }}
            >
              <CardContent>
                <InterestField {...interest} disabled={true} />
              </CardContent>
            </div>
          </Card>
        ))}
      <Box>

      </Box>

      <DownloadPrintables
        currentUser={currentUser}
        attendeeInterests={currentEvent.attendance ? currentEvent.attendance.userInterests : []}
        eventInterests={currentEvent.interest_set}
      />
      {isOwnEvent() && (
        <InviteAttendeeForm
          attendance={ATTENDANCE_STATUS.Pending}
          eventId={currentEvent.id}
          style={{ marginTop: "15px" }}
        />
      )}
      <SwipeableDrawer anchor={'bottom'} open={drawerOpen} onOpen={() => setOpen(true)} onClose={cancelRating}>
        <RateInterestsForm
          interests={currentEvent.interest_set}
          ratings={interestRatings}
          confirmRatings={confirmRating}
          cancelAction={cancelRating}
          ratingChangeHandler={ratingChanged}
        />
      </SwipeableDrawer>
      <Box className={css.eventActionBar}>
        <ButtonGroup variant="outlined" classes={attendanceStatus === ATTENDANCE_STATUS.Pending ? { groupedOutlined: css.goingPending } : {}}>
          <Button
            onClick={joinEvent}
            classes={{ contained: css.goingSelected }}
            variant={
              ATTENDANCE_STATUS.Accepted === attendanceStatus
                ? "contained"
                : "outlined"
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
                ? "contained"
                : "outlined"
            }
            size="large"
            color="primary"
          >
            Not going
            </Button>
        </ButtonGroup>
        {ATTENDANCE_STATUS.Accepted === attendanceStatus &&
          <Button onClick={() => setOpen(true)}><ColorLensIcon className={css.rateInterestsButton}/></Button>
        }
      </Box>
    </Box>
  );
};

export { EventDetailsScreen };
