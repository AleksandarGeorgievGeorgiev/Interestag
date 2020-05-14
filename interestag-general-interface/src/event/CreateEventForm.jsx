import React,  { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';

import DateFnsUtils from '@date-io/date-fns';
import { UserContext } from '../user-context/UserContextProvider';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useFormHandler } from '../register/useFormHandler';
import Alert from '@material-ui/lab/Alert';
import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Fab from '@material-ui/core/Fab';
import { DateTimePicker } from "@material-ui/pickers";
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

function CreateEventForm(){

    const {
        handleChange, handleSubmit, values, errors,
    } = useFormHandler(
        submit,
    );
        const baseUrl = 'http://localhost:8000/api/';
        const { authenticateUser } = useContext(UserContext);
        const navigationHistory = useHistory();

    function submit() {
    // axios
    //     // .post(`${baseUrl}auth/register/`, values)
    //     // .then((res) => { authenticateUser(values); navigationHistory.push('/') })
    //     // .catch((err) => console.log(err));
    }

    return(
        <form>
            <TextField
                id="standard-description-flexible"
                name="name"
                multiline
                label="Event Name"
                value={values.name}
                onChange={handleChange}
            />
            <br />
            <br />
            <TextField
                id="standard-multiline-static"
                label="Multiline"
                multiline
                name="description"
                label="Description"
                value={values.email}
                onChange={handleChange}
            />
            <br />
            <br />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    label="DateTimePicker"
                    name="event_date"
                />
            </MuiPickersUtilsProvider>
            <br />
            <br />
            <InputLabel id="demo-simple-select-helper-label">Event publicity</InputLabel>
            <Select
                native
                value={values.publicity}
                onChange={handleChange}
                className="publicity-picker"
                name="publicity"
                inputProps={{
                    id: 'publicity',
                }}
                >
                <option aria-label="None" value="" />
                <option value={0}>public</option>
                <option value={1}>private</option>
                <option value={2}>unlisted</option>
            </Select>
            <br />
            <br />
            <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            className="custom-fab-button"
            >
            Create interests
            <ArrowForwardIosIcon className="forwardArrowIcon"  />
            </Fab>
                {/* <Button className="signup-button" onClick={handleSubmit}>
                    Register
                </Button> */}
            <br />
        </form>
    )
}

export { CreateEventForm }