import React from 'react';

import { CreateEventForm } from './CreateEventForm';
import { Header } from '../core/Header';

function CreateEventScreen() {
    return (
      <div className="body">
        <Header />
        <br />
        <CreateEventForm />
      </div>
    );
  }
  
  export { CreateEventScreen };