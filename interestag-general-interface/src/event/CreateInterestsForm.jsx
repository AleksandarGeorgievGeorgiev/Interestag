import React, { useState } from 'react';

import { useFormHandler } from '../register/useFormHandler';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { BlockPicker } from 'react-color';
import { InterestField } from './InterestField';

const CreateInterestsForm = () => {
  const [interests, setInterests] = useState([{ name: '', color: '#D9E3F0'}]);
  const submitForm = () => {

  }

  const valueChanged = (index, value) => {
    const tempInterests = interests.slice();

    tempInterests[index] = { ...tempInterests[index], ...value}

    setInterests(tempInterests);
  }

  return (
    <form>
      {interests.map((interest, index) => (<InterestField {...interest} index={index} valueChanged={valueChanged} />))}
      <br />
      <Button
        // onClick={}
        className="custom-fab-button"
      >
        Create Event
      </Button>
    </form>
  )
}

export { CreateInterestsForm }