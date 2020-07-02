import React, { useState } from 'react';

import { TextField } from '@material-ui/core';
import { CirclePicker } from 'react-color';
import DeleteIcon from '@material-ui/icons/Delete';

const COLOR_SET = ['#ff5722', '#03a9f4', '#ffc107', '#673ab7', '#009688', '#4caf50'];

const InterestField = ({
  index, name, colour, valueChanged, deleteInterest, disabled,
}) => {
  const [colorPickerOpen, setOpen] = useState(false);

  const colorChanged = (value) => {
    valueChanged(index, { colour: value.hex });
    setOpen(false);
  };

  const textChanged = (event) => {
    event.persist();

    valueChanged(index, { name: event.target.value });
  };

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
        <div style={{ alignSelf: 'center', marginTop: '10px', display: 'flex' }}>
          <div
            style={{
              height: '20px',
              width: '20px',
              backgroundColor: colour || '#ccc',
              borderRadius: '50%',
              display: 'inline-block',
              cursor: disabled ? 'default' : 'pointer',
            }}

            onClick={() => !disabled && setOpen(!colorPickerOpen)}
          />
          {!disabled && <DeleteIcon style={{ marginLeft: '15px', cursor: 'pointer' }} onClick={() => deleteInterest(index)} />}
        </div>
      </div>
      {colorPickerOpen
        && (
        <div style={{
          display: 'flex', justifyContent: 'center', marginTop: '10px', padding: '5px 0', backgroundColor: '#f6f8fa',
        }}
        >
          <CirclePicker
            color={`${colour}`}
            onChange={colorChanged}
            colors={COLOR_SET}
          />
        </div>
        )}
    </div>
  );
};

export { InterestField };
