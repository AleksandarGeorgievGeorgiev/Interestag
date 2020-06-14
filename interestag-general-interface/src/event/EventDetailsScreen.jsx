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
} from "@material-ui/core";

import { InterestField } from "./InterestField";
import { UserContext } from "../user-context/UserContextProvider";
import { InviteAttendeeForm } from "./InviteAttendeeForm";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import Rating from "@material-ui/lab/Rating";
import { Redirect } from "react-router-dom";

import { useProtectedApi } from "../core/useProtectedApi";

const ATTENDANCE_STATUS = {
  Pending: 1,
  Accepted: 2,
  Rejected: 3,
};

const EventDetailsScreen = () => {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const [currentEvent, setCurrentEvent] = useState({});
  const [creator, setCreator] = useState({});
  const [attendanceStatus, setAttendanceStatus] = useState(0);
  const { state: eventFromHistory } = history.location;
  const { id: eventId } = useParams();
  const protectedApi = useProtectedApi();
  const [rating, setRating] = useState(false);

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
      setCurrentEvent({
        ...eventData,
        attendance: {
          id: attendance.id,
          user: attendance.user,
          userInterests: attendance.eventatendeeintereset_set,
        },
      });
    });
  };

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

        if (attendanceFound) {
          return attendanceFound;
        }

        return {};
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

          //TODO: Rate event interests
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

  const getInterestRating = (interestId) => {
    if (!currentEvent.attendance.userInterests) {
      return 0;
    }

    const interestFound = currentEvent.attendance.userInterests.find(i => i.interest === interestId);

    return interestFound ? interestFound.score : 0;
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
              background: `linear-gradient(90deg, ${interest.colour} ${getInterestRating(interest.id) * 10}%, #FFFFFF ${getInterestRating(interest.id) * 10}%)`
            }}
            >
              <CardContent>
                <InterestField {...interest} disabled={true} />
              </CardContent>
            </div>
          </Card>
        ))}
      <Box component="fieldset" mb={3} borderColor="transparent">
        {/* <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        /> */}
      </Box>
      <Box>
        <ButtonGroup style={{ marginTop: "15px" }} variant="outlined">
          <Button
            onClick={joinEvent}
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
            variant={
              ATTENDANCE_STATUS.Rejected === attendanceStatus || ATTENDANCE_STATUS.Pending === attendanceStatus
                ? "contained"
                : "outlined"
            }
            size="large"
            color="primary"
          >
            Not going
          </Button>
        </ButtonGroup>
      </Box>
      {ATTENDANCE_STATUS.Accepted === attendanceStatus && <Button onClick={() => setRating(true)}>Rate</Button>}
      {isOwnEvent() && (
        <InviteAttendeeForm
          attendance={ATTENDANCE_STATUS.Pending}
          eventId={currentEvent.id}
          style={{ marginTop: "15px" }}
        />
      )}

      <SwipeableDrawer anchor={'bottom'} open={rating} onClose={() => setRating(false)}>
        <h3>Rate Interests</h3>
        <Divider />
        {currentEvent.interest_set &&
          currentEvent.interest_set.map((interest, index) => (
            <Card key={index}>
              <div>
                <CardContent>
                  <InterestField {...interest} disabled={true} />
                  <Slider
                    marks={true}
                    step={1}
                    min={0}
                    max={10}
                    valueLabelDisplay={'auto'}
                    value={getInterestRating(interest.id)}
                  />
                </CardContent>
              </div>
            </Card>
          ))}
      </SwipeableDrawer>
    </Box>
  );
};

export { EventDetailsScreen };
