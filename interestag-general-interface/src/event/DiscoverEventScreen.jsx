<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
>>>>>>> c65f4ef4e9456e4f0bf71d71d4e791c86038c91f

import { Header } from "../core/Header";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Ripples from "react-ripples";
import { EventDetailsScreen } from "./EventDetailsScreen";
import { Route } from "react-router";

function DiscoverEventScreen() {
  const [events, setEvents] = useState([]);
  const navigationHistory = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/event/discover/`)
      .then((res) => {
        setEvents(res.data);
      });
  }, []);

  const clickedEvent = (itemId) => {
    navigationHistory.push(`/event/${itemId}/`);
  }

  return (
    <div className="body">
      <div>
        {events.map((item) => (
          <Card>
            <div className="list-group-item">
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
}

<<<<<<< HEAD
export { DiscoverEventScreen };
=======
export { DiscoverEventScreen };
>>>>>>> c65f4ef4e9456e4f0bf71d71d4e791c86038c91f
