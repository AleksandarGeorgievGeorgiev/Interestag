import React, {useState, useEffect} from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Ripples from "react-ripples";
import Divider from '@material-ui/core/Divider';
import WarningIcon from '@material-ui/icons/Warning';

const GoingToEventScreen = () => {
  const [events, setEvents] = useState([]);
  const navigationHistory = useHistory();
  
  useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_BASEURL}/api/event/going-to/`)
    .then((res) => {
      setEvents(res.data);
    });
  },[]);
  
  
  const clickedEvent = (event) => {
    navigationHistory.push({
      pathname: `/event/${event.id}/`, 
      state: { ...event }
    });
    console.log(events.sort(function(a,b){return a.invitation_status- b.invitation_status}))
  };

  return (
    <div className="body">
      <div>
      {events.sort(function(a,b){return a.invitation_status- b.invitation_status}).map((event, index) => (
        event.invitation_status === 1 ? 
        <Card key={event.id} style={{ marginTop: "10px" }}>
            <div className="pending-items">
              <Ripples>
                <CardContent onClick={() => clickedEvent(event)} >
                  <div><WarningIcon className="pending-icon"/></div> 
                  <div>{event.event.name} | {new Date(event.event.event_date).toDateString()}</div>
                </CardContent>
              </Ripples>
            </div>
          </Card>
        :<Card key={event.id} style={{ marginTop: "10px" }}>
            <div className="going-to-items">
              <Ripples>
                <CardContent onClick={() => clickedEvent(event)}>
                  <div>{event.event.name} | {new Date(event.event.event_date).toDateString()}</div>
                </CardContent>
              </Ripples>
            </div>
          </Card>))}
      </div>
    </div>
  );
};

export { GoingToEventScreen };
