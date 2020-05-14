import React, { useState } from 'react';

import { useFormHandler } from '../register/useFormHandler';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { BlockPicker } from 'react-color';
import { InterestField } from './InterestField';
import AddIcon from '@material-ui/icons/Add';

const CreateInterestsForm = ({ interests, addInterest, deleteInterest, valueChanged }) => {

  return (
    <>
      {interests.map((interest, index) => 
        (
          <InterestField 
            {...interest} 
            index={index} 
            valueChanged={valueChanged}
            deleteInterest={deleteInterest} />
        )
      )}
      <Button 
        variant="contained" 
        disableElevation 
        style={{ width: '100px', margin: '5px 5px'}}
        onClick={addInterest}>
        <AddIcon />
      </Button>
      <br />
      
    </>
  )
}

export { CreateInterestsForm }