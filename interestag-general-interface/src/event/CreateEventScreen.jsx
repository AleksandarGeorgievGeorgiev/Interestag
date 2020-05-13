import React, { useState } from 'react';

import { CreateEventForm } from './CreateEventForm';
import { CreateInterestsForm } from './CreateInterestsForm';
import { Header } from '../core/Header';

function CreateEventScreen() {
  const [step, setStep] = useState((<CreateEventForm />));
    return (
      <div className="body">
        <Header />
        <br />
        <CreateEventForm />
        <CreateInterestsForm />
      </div>
    );
  }
  
  export { CreateEventScreen };