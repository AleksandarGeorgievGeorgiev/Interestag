import React from 'react'

import AppBar from '@material-ui/core/AppBar'

function AppTopBar(props){
    return(
        <AppBar className="AppBar">
            <h3>{props.pageName}</h3>
        </AppBar>
    )
}

export default AppTopBar

