import React, {useState} from 'react'

import AccountChooseList from './AccountChooseList'

import TextField from '@material-ui/core/TextField'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Button from '@material-ui/core/Button'
import GoogleButton from 'react-google-button'
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import Header from '../core/Header'

function RegisterForm(props){      
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedDate, handleDateChange] = useState(new Date());

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
                <AccountChooseList />
                <Button 
                    className="signup-button"
                    style={styles.button}
                >Save</Button>
                <br/>
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