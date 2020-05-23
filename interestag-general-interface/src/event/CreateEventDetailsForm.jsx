import React, { useState, useContext } from 'react'

import DateFnsUtils from '@date-io/date-fns';
import Fab from '@material-ui/core/Fab';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { TextField, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { DateTimePicker } from "@material-ui/pickers";
import Select from '@material-ui/core/Select';

function CreateEventDetailsForm({ handleChange, handleSubmit, values, errors, nextStep }) {
  return (
    <>
      <div>
        <TextField
          id="standard-description-flexible"
          name="name"
          label="Event Name"
          value={values.name}
          onChange={handleChange}
        />
        <br />
        <br />
        <TextField
          id="standard-multiline-static"
          multiline
          name="description"
          label="Description"
          value={values.description}
          onChange={handleChange}
        />
        <br />
        <br />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            label="Date"
            ampm={false}
            autoOk={true}
            disablePast={true}
            format={'yyyy-MM-dd hh:mm'}
            value={values['eventDate'] ? values['eventDate'] : null}
            onChange={date => handleChange({ target: { name: 'eventDate', value: date } })}
          />
        </MuiPickersUtilsProvider>
        <br />
        <br />
        <FormControl>
          <TextField
            name="topInterests"
            label="Interests on badge"
            type="number"
            value={values.topInterests ? values.topInterests : ''}
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <br />
        <FormControl>
          <InputLabel htmlFor="event_publicity">Event publicity</InputLabel>
          <Select
            native
            id="event_publicity"
            value={values.publicity}
            onChange={handleChange}
            name="publicity"
          >
            <option value=""></option>
            <option value={1}>Public</option>
            <option value={2}>Private</option>
            <option value={3}>Unlisted</option>
          </Select>
        </FormControl>
      </div>

      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={'custom-fab-button'}
        onClick={nextStep}>
        Next
        <ArrowForwardIosIcon style={{ color: '#fff' }} fontSize={'small'} />
      </Fab>
    </>
  )
}

export { CreateEventDetailsForm }