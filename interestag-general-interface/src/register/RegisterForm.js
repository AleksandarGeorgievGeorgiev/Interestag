import React from 'react'

import TextField from '@material-ui/core/TextField'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Button from '@material-ui/core/Button'
import GoogleButton from 'react-google-button'

import Header from '../core/Header'

function LoginForm(props){      
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
                    id="standard-username/email-flexible"
                    label="Email"
                    multiline
                    rowsMax="4"
                />
                <br/>
                <TextField
                    id="standard-username/email-flexible"
                    label="Password"
                    multiline
                    rowsMax="4"
                />
                <br/>
                <br/>
                <TextField
                    id="standard-username/email-flexible"
                    label="Password"
                    multiline
                    rowsMax="4"
                />
                <br/>
                <Button
                    className="signin-button" 
                    style={styles.button}
                >Sign in</Button>
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

export default LoginForm