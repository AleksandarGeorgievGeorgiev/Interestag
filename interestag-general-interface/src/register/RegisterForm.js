import React, {useState} from 'react'

import TextField from '@material-ui/core/TextField'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Button from '@material-ui/core/Button'
import GoogleButton from 'react-google-button'
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Header from '../core/Header'

function RegisterForm(props){      
    const [selectedDate, handleDateChange] = useState(new Date());

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      console.log(event.currentTarget)
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return(
        <MuiThemeProvider>
            <React.Fragment>
                <br/>
                <Header />
                <br/>
                <br/>
                <TextField
                    id="standard-firstName-flexible"
                    label="First name"
                    multiline
                    rowsMax="4"
                />
                <br/>
                <TextField
                    id="standard-lastName-flexible"
                    label="Last name"
                    multiline
                    rowsMax="4"
                />
                <br/>
                <TextField
                    id="standard-username/email-flexible"
                    label="Username"
                    multiline
                    rowsMax="4"
                />
                <br/>
                <TextField
                    id="standard-Email-flexible"
                    label="Email"
                    multiline
                    rowsMax="4"
                />
                <br/>
                <TextField
                    id="standard-Password-flexible"
                    label="Password"
                    multiline
                    rowsMax="4"
                />
                <br/>
                <br/>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        value={selectedDate}
                        disablePast
                        onChange={handleDateChange}
                        label="Date of birth"
                        showTodayButton
                    />
                </MuiPickersUtilsProvider>
                <br/>
                <br/>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    Choose Account type
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Free</MenuItem>
                    <MenuItem onClick={handleClose}>Paid</MenuItem>
                    <MenuItem onClick={handleClose}>Premieum</MenuItem>
                </Menu>
                <br/>
                <br/>
                <GoogleButton 
                    type="dark"
                    style={styles.googleButton}
                />
            </React.Fragment>
        </MuiThemeProvider>
    )
}

const styles = {
    button: {
        margin: 15,
    },
    googleButton:{
        float:'none',
        position:'static',
        display:'block',
        margin:'auto',
    }
}

export default RegisterForm