import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Header } from '../core/Header';

import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

function DiscoverEventScreen() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/event/discover/`)
      .then(res => {
        setEvents(res.data);
      });
  }, []);

  function listItemClicked(event) {
    console.log("clicked");
  }

  return (
    <div className="body">
      <Header />
      <div>
        {events.map(item => (
          <div key={item.id} onClick={listItemClicked} className="list-group-item">
            {item.id}
          </div>
        ))
        }
      </div>
    </div>
  );
}

export { DiscoverEventScreen };