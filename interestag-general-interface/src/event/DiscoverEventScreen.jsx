import React from 'react';

import { Header } from '../core/Header';

import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

function DiscoverEventScreen() {
    const events = ["event1", "event2", "event3","event4", "event5", "event6","event7", "event8", "event9"]

    function listItemClicked(event){
        console.log("clicked");
    }

    return (
      <div className="body">
        <Header />
        <div>
            {events.map(item => (
                <div onClick={listItemClicked} className="list-group-item">
                    {item}
                </div>
            ))
            }
        </div>
      </div>
    );
  }
  
  export { DiscoverEventScreen };