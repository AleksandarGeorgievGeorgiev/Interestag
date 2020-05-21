import React, { useState, useEffect } from "react";

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
    console.log('discover');
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/event/discover/`)
      .then((res) => {
        setEvents(res.data);
      });
  }, []);

  const clickedEvent = (itemId) => {
    // navigationHistory.push(`/event/${itemId}/`);
  }

  return (
    <div className="body">
      <div>
        {events.map((item) => (
          <Card key={item.id}>
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

export { DiscoverEventScreen };
