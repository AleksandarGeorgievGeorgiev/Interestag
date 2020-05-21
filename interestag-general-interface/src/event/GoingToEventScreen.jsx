import React, {useState, useEffect} from "react";

import axios from "axios";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Ripples from "react-ripples";

const GoingToEventScreen = () => {
  const [events, setEvents] = useState([]);
  const navigationHistory = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/event/going_to/`)
      .then((res) => {
        setEvents(res.data);
      });
  }, []);

  const clickedEvent = (event) => {
    navigationHistory.push({
      pathname: `/event/${event.id}/`, 
      state: { ...event }
    });
  };

  return (
    <div className="body">
      <div>
        {events.map((event, index) => (
          <Card key={event.id}>
            <div className="going-to-items">
              <Ripples>
                <CardContent onClick={() => clickedEvent(event)}>
                  <Typography>
                    {event.name} | {new Date(event.event_date).toDateString()}
                  </Typography>
                </CardContent>
              </Ripples>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { GoingToEventScreen };
