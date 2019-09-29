import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {FilterList} from "../../../assets/icons/icons";
import RadioButtonsGroup from "../filter-list/radio-button";

export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    return (
        <div>
            <Tooltip title="Filter list">
                <IconButton aria-label="filter list" onClick={handleClick}>
                    <FilterList/>
                </IconButton>
            </Tooltip>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <RadioButtonsGroup/>
                </MenuItem>
            </Menu>
        </div>
    );
}
