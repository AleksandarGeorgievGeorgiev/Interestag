import React, { useState } from 'react';

import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import { MobileStepper } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { CreateEventForm } from './CreateEventForm';
import { CreateInterestsForm } from './CreateInterestsForm';
import { Header } from '../core/Header';
import { useFormHandler } from '../register/useFormHandler';
import { CreateEventOverview } from './CreateEventOverview';
import { QontoStepper } from './QontoStepper';

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

  const stepClicked = (index) => {
    setStep(index);
  }

  const nextStep = () => {
    setStep(activeStep + 1);
  }

  const prevStep = () => {
    setStep(activeStep - 1);
  }

  const renderFormByStep = () => {
    switch (activeStep) {
      case 0: return (
        <CreateEventForm {...createEventFormHandler} nextStep={nextStep}/>
      );
      case 1: return (
        <CreateInterestsForm
          interests={interests}
          valueChanged={valueChanged}
          deleteInterest={deleteInterest}
          addInterest={addInterest}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
      case 2: return (
        <CreateEventOverview 
          eventDetails={createEventFormHandler.values} 
          interests={interests}
          prevStep={prevStep}
          createEvent={createEvent} />
      )
    }
  }

  return (
    <div className="body">
      <Header />
      <br />
      <QontoStepper activeStep={activeStep} stepClicked={stepClicked} />
      {renderFormByStep()}
      <br />
    </div>
  );
}

export { CreateEventScreen };