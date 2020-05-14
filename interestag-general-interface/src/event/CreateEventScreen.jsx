import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import { MobileStepper } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { CreateEventForm } from './CreateEventForm';
import { CreateInterestsForm } from './CreateInterestsForm';
import { Header } from '../core/Header';
import { useFormHandler } from '../register/useFormHandler';
import { CreateEventOverview } from './CreateEventOverview';

function CreateEventScreen() {
  const [activeStep, setStep] = useState(0);
  const [interests, setInterests] = useState([{ name: '', color: '' }]);

  const valueChanged = (index, value) => {
    const tempInterests = interests.slice();

    tempInterests[index] = { ...tempInterests[index], ...value }

    setInterests(tempInterests);
  }

  const addInterest = () => {
    const tempInterests = interests.slice();
    tempInterests.push({ name: '', color: '' });

    setInterests(tempInterests);
  }

  const deleteInterest = (index) => {
    const tempInterests = interests.slice();
    tempInterests.splice(index, 1);

    setInterests(tempInterests);
  }

  const createEventFormHandler = useFormHandler();

  const createEvent = () => {
    const eventDetails = createEventFormHandler.values;

    console.log(interests, eventDetails);
  }

  const renderFormByStep = () => {
    switch (activeStep) {
      case 0: return (
        <CreateEventForm {...createEventFormHandler} />
      );
      case 1: return (
        <CreateInterestsForm
          interests={interests}
          valueChanged={valueChanged}
          deleteInterest={deleteInterest}
          addInterest={addInterest}
        />
      );
      case 2: return (
        <CreateEventOverview 
          eventDetails={createEventFormHandler.values} 
          interests={interests} 
          createEvent={createEvent} />
      )
    }
  }

  return (
    <div className="body">
      <Header />
      <br />
      {renderFormByStep()}
      <br />

      <MobileStepper
        variant="dots"
        position="static"
        activeStep={activeStep}
        steps={3}
        nextButton={
          <Button size="small" onClick={() => setStep(activeStep + 1)} disabled={activeStep === 2}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={() => setStep(activeStep - 1)} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      >
      </MobileStepper>

    </div>
  );
}

export { CreateEventScreen };