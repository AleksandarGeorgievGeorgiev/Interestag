import React, { useState } from 'react';

import axios from 'axios';

import { CreateInterestsForm } from './CreateInterestsForm';
import { useFormHandler } from '../register/useFormHandler';
import { CreateEventOverview } from './CreateEventOverview';
import { CreateEventDetailsForm } from './CreateEventDetailsForm';

const CreateEventMultiform = ({ activeStep, nextStep, prevStep }) => {
  const [interests, setInterests] = useState([{ name: '', color: '' }]);
  const createEventFormHandler = useFormHandler();

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

  const interestValueChanged = (index, value) => {
    const tempInterests = interests.slice();

    tempInterests[index] = { ...tempInterests[index], ...value }

    setInterests(tempInterests);
  }

  const createEvent = () => {
    const eventDetails = createEventFormHandler.values;

    // axios.post(`${process.env.REACT_APP_BASEURL}/api/event/`, {
    //   'name': eventDetails.name,
    //   'descritpion': eventDetails.descritpion,
    //   'event_date': eventDetails.eventDate,
    //   'interest_selection_count': eventDetails.topInterests,
    //   'publicity': eventDetails.publicity
    // }).then(res => {
    //   axios.post(`${process.env.REACT_APP_BASEURL}/api/interest/create_many/`, {

    //   })
    // });
  }

  const renderFormByStep = () => {
    switch (activeStep) {
      case 0: return (
        <CreateEventDetailsForm {...createEventFormHandler} nextStep={nextStep}/>
      );
      case 1: return (
        <CreateInterestsForm
          interests={interests}
          valueChanged={interestValueChanged}
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
    <form>
      {renderFormByStep()}
    </form>
  );
}

export { CreateEventMultiform };