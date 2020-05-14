import React, { useState } from 'react';

import { useFormHandler } from '../register/useFormHandler';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { CirclePicker } from 'react-color';
import DeleteIcon from '@material-ui/icons/Delete';

const InterestField = ({ index, name, color, valueChanged, deleteInterest, disabled }) => {
  const [colorPickerOpen, setOpen] = useState(false);

  const colorChanged = (value) => {
    valueChanged(index, { color: value.hex })
    setOpen(false);
  }

  const textChanged = (event) => {
    event.persist();

    valueChanged(index, { name: event.target.value });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          name="name"
          label="Interest Name"
          type="text"
          disabled={disabled}
          value={name}
          onChange={textChanged}
        />
        <div style={{ alignSelf: 'center', marginTop: '10px', display: 'flex' }} >
          <div
            style={{
              height: '20px',
              width: '20px',
              backgroundColor: color ? color : '#ccc',
              borderRadius: '50%',
              display: 'inline-block',
              cursor: disabled ? 'default' : 'pointer',
            }}

            onClick={() => !disabled && setOpen(!colorPickerOpen)}
          >
          </div>
          {!disabled && <DeleteIcon style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => deleteInterest(index)} />}
        </div>
      </div>
      {colorPickerOpen &&
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', padding: '5px 0', backgroundColor: '#f6f8fa'}}>
          <CirclePicker
            color={`${color}`}
            onChange={colorChanged}
            colors={["#ff5722", "#03a9f4", "#ffc107", "#673ab7", "#009688", "#4caf50"]}
          />
        </div>}
    </div>
  );
}

export { InterestField };