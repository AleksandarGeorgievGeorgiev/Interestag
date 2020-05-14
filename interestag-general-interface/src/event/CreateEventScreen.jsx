import React, { useState } from 'react';

import Fab from '@material-ui/core/Fab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';

import { CreateEventForm } from './CreateEventForm';
import { CreateInterestsForm } from './CreateInterestsForm';
import { Header } from '../core/Header';
import { useFormHandler } from '../register/useFormHandler';
import { MobileStepper } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


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
      // case 2: return (
      //   <>
      //     <CreateEventForm {...createEventFormHandler} />
      //     <CreateInterestsForm
      //       interests={interests}
      //       valueChanged={valueChanged}
      //       deleteInterest={deleteInterest}
      //       addInterest={addInterest}
      //     />
      //   </>
      // )
    }
  }

  return (
    <div className="body">
      <Header />
      <br />
      {renderFormByStep()}
      <br />
      {activeStep === 2 && <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className="custom-fab-button"
        onClick={createEvent()}
      >
        'Create event'
        <ArrowForwardIosIcon className="forwardArrowIcon" />
      </Fab>}

      <MobileStepper
        variant="dots"
        position="static"
        activeStep={activeStep}
        steps={2}
        nextButton={
          <Button size="small" onClick={() => setStep(activeStep + 1)} disabled={activeStep === 1}>
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