import React, { useState } from 'react';

import { useFormHandler } from '../register/useFormHandler';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { BlockPicker } from 'react-color';

const InterestField = ({ index, name, color, valueChanged }) => {
  const [colorPickerOpen, setOpen] = useState(false);

  const colorChanged = (value) => {
    valueChanged(index, { color: value.hex })
  }

  const textChanged = (event) => {
    event.persist();

    valueChanged(index, { name: event.target.value });
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <TextField
        name="name"
        label="Interest Name"
        type="text"
        value={name}
        onChange={textChanged}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }} >
        <div
          style={{
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            // display: 'inline-block',
            cursor: 'pointer',
          }}

          onClick={() => setOpen(!colorPickerOpen)}
        >
          <div
            // onClick={handleSubmit}
            style={{
              width: '36px',
              height: '14px',
              borderRadius: '2px',
              backgroundColor: `${color}`,
            }}


          >
          </div>
        </div>

        {colorPickerOpen &&
          <BlockPicker
            color={`${color}`}
            onChange={colorChanged}
          />}
      </div>


    </div>
  );
}

export { InterestField };