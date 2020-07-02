import React, { useState } from 'react';

import { BlockPicker } from 'react-color';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Fab from '@material-ui/core/Fab';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import { InterestField } from './InterestField';
import { useFormHandler } from '../register/useFormHandler';

const CreateInterestsForm = ({
  interests, addInterest, deleteInterest, valueChanged, nextStep, prevStep,
}) => (
  <>
    {interests.map((interest, index) => (
      <InterestField
        key={index}
        {...interest}
        index={index}
        valueChanged={valueChanged}
        deleteInterest={deleteInterest}
      />
    ))}
    <Button
      variant="contained"
      disableElevation
      style={{ width: '100px', margin: '5px 5px' }}
      onClick={addInterest}
    >
      <AddIcon />
    </Button>
    <br />
    <Fab
      variant="extended"
      size="medium"
      color="primary"
      aria-label="add"
      className="custom-fab-button"
      onClick={prevStep}
    >
      <ArrowBackIosIcon style={{ color: '#fff' }} fontSize="small" />
      Back
    </Fab>
    <Fab
      variant="extended"
      size="medium"
      color="primary"
      aria-label="add"
      className="custom-fab-button"
      onClick={nextStep}
    >
      Next
      <ArrowForwardIosIcon style={{ color: '#fff' }} fontSize="small" />
    </Fab>
  </>
);

export { CreateInterestsForm };
