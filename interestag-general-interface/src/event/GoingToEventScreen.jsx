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

  const clickedEvent = (itemId) => {
    navigationHistory.push(`/event/${itemId}/`);
  };

  return (
    <div className="body">
      <div>
        {events.map((item) => (
          <Card key={item.id}>
            <div className="going-to-items">
              <Ripples>
                <CardContent onClick={() => clickedEvent(item.id)}>
                  <Typography>
                    {item.name} | {new Date(item.event_date).toDateString()}
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
