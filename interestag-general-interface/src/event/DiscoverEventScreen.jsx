import React from "react";

import { Header } from "../core/Header";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Ripples from "react-ripples";

function DiscoverEventScreen() {
  const events = [
    "event1event1event1",
    "event2event2event2",
    "event3event2event2",
    "event4event2event2",
    "event5event2",
    "event6event2event2",
    "event7event2event2event2",
    "event8event2",
    "event9event2event2",
    "event7",
    "event8event2event2",
    "event9event2",
    "event7event2",
    "event8",
    "event9",
  ];

  function listItemClicked(event) {
    console.log("clicked");
  }

  return (
    <div className="body">
      <div>
        {events.map((item) => (
          <Card>
            <div className="list-group-item">
              <Ripples>
                <CardContent
                  onClick={listItemClicked}
                >
                  <Typography>{item}</Typography>
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
