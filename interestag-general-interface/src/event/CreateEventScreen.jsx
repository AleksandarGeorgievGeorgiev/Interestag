import React, { useState } from 'react';

import { Header } from '../core/Header';
import { QontoStepper } from './QontoStepper';
import { CreateEventMultiform } from './CreateEventMultiform';

function CreateEventScreen() {
  const [activeStep, setStep] = useState(0);

  const stepClicked = (index) => {
    setStep(index);
  }

  const nextStep = () => {
    setStep(activeStep + 1);
  }

  const prevStep = () => {
    setStep(activeStep - 1);
  }

  return (
    <div>
      <QontoStepper activeStep={activeStep} stepClicked={stepClicked} />
      {<CreateEventMultiform activeStep={activeStep} nextStep={nextStep} prevStep={prevStep} />}
      <br />
    </div>
  );
}

export { CreateEventScreen };