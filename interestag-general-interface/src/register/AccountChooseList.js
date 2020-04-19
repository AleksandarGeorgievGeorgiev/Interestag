import React from 'react';

import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button'


function AccountChooseList(){

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const accountOptions = [
        'Free',
        'Paid',
        'Premium'
    ]

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
    setAnchorEl(null);
    };

    const handleClose = () => {
    setAnchorEl(null);
    };

    return(
        <div>
            <Button
                className="accountList"
                onClick={handleClickListItem}
            >
                {accountOptions[selectedIndex]}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            > 
                {accountOptions.map((accountOption, index) => (
                    <MenuItem
                        key={accountOption}
                        selected={index === selectedIndex} 
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                    {accountOption}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default AccountChooseList