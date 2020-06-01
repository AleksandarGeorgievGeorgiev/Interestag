import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { useParams, useHistory, Link } from "react-router-dom";
import {
  Box,
  Divider,
  Button,
  ButtonGroup,
  TextField,
} from "@material-ui/core";

import { InterestField } from "./InterestField";
import { UserContext } from "../user-context/UserContextProvider";
import { InviteAttendeeForm } from "./InviteAttendeeForm";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import  { Redirect } from 'react-router-dom'

const ATTENDANCE_STATUS = {
  Pending: 1,
  Accepted: 2,
  Rejected: 3,
};

const EventDetailsScreen = () => {
  const  history  = useHistory();
  const { currentUser } = useContext(UserContext);
  const [event, setEvent] = useState({});
  const [creator, setCreator] = useState({});
  const [attendance, setAttendance] = useState(0);
  const { state: eventFromHistory } = history.location;
  const { id: eventId } = useParams();

  useEffect(() => {
    if (eventFromHistory) {
      setEventData(eventFromHistory);
    } else {
      axios
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
      setAttendance(attendance);
      setEvent(eventData);
    });
  };

  const getCreatorData = (creatorId) => {
    return axios
      .get(`${process.env.REACT_APP_BASEURL}/api/auth/profile/${creatorId}/`)
      .then((creatorRes) => creatorRes.data);
  };

  const getAttendanceStatus = (eventId) => {
    return axios
      .get(`${process.env.REACT_APP_BASEURL}/api/event/going-to`)
      .then((attendanceRes) => {
        const eventFound = attendanceRes.data.find((e) => e.id === eventId);

        if (eventFound) {
          return ATTENDANCE_STATUS.Accepted;
        } else {
          return ATTENDANCE_STATUS.Rejected;
        }
      });
  };

  const joinEvent = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/api/attendance/`, {
        user: currentUser.userId,
        event: event.id,
        invitation_status: ATTENDANCE_STATUS.Accepted,
      })
      .then((res) => setAttendance(res.invitation_status));
  };

  const leaveEvent = () => {
    axios
      .patch(`${process.env.REACT_APP_BASEURL}/api/attendance/${event.id}/`, {
        invitation_status: ATTENDANCE_STATUS.Rejected,
      })
      .then((res) => setAttendance(res.invitation_status));
  };
  
  const deleteOnClick = (eventId) => {
    axios
      .delete(`${process.env.REACT_APP_BASEURL}/api/event/${event.id}/`,{
      })
      .then(history.push({
        pathname: `/profile/${creator}`
      }));
  }

  const isOwnEvent = () => {
    return event.creator === currentUser.userId;
  };

  return (
    <Box className="body" display="flex" flexDirection="column">
      <Box display="flex" justifyContent="center">
        <h3>{event.name}</h3>
        {isOwnEvent() && (
          <ButtonGroup style={{ marginLeft: "auto" }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              component={Link}
              to={{
                pathname: `/event/${event.id}/edit/`,
                state: event,
              }}
            >
              Edit
            </Button>,
            <Button
              size="small"
              variant="contained"
              color="primary"
              component={Link}
              onClick={() => deleteOnClick(event.id)}
              
            >
              Delete 
            </Button>
          </ButtonGroup>
        )}
      </Box>

      <Divider />
      <Box display="flex" justifyContent="space-around">
        {event.event_date && new Date(event.event_date).toDateString()}
        <span>{creator.username}</span>
      </Box>
      <p>{event.description}</p>
      <h3>Interests</h3>
      <Divider />
      {event.interest_set &&
        event.interest_set.map((interest, index) => (
          <Card key={event.id}>
            <div className="going-to-items">
                <CardContent>
                  <InterestField key={index} {...interest} disabled={true} />
                </CardContent>
            </div>
          </Card>
        ))}
      <Divider />
      <Box>
        <ButtonGroup style={{ marginTop: "15px" }} variant="outlined">
          <Button
            onClick={joinEvent}
            variant={
              ATTENDANCE_STATUS.Accepted === attendance
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
              ATTENDANCE_STATUS.Rejected === attendance
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
      {isOwnEvent() && <InviteAttendeeForm style={{ marginTop: "15px" }} />}
    </Box>
  );
};

export { EventDetailsScreen };
