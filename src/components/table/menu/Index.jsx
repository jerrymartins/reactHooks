import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {MoreIcon} from "../../../assets/icons/icons";
import api from "../../../services/api";
import {useDispatch} from "react-redux";

function deleteUser(pathdelete, dispatch) {
    api.delete(`${pathdelete}`).then(res => {
        dispatch({type: 'USER', ...{loadData: true}});
    }).catch(err => console.log(err));
}

export default function SimpleMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();

    function handleClickDeleteUser(event) {
        setAnchorEl(event.currentTarget);
        deleteUser(props.pathdelete, dispatch);
    }

    function handleClickUpdateUser(event) {
        setAnchorEl(event.currentTarget);
        dispatch({type: 'DIALOG_USER', ...{dialog_open: true, user: props.row}});
    }

    function handleClose() {
        setAnchorEl(null);
    }

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <MoreIcon/>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {!props.notEdit ? <MenuItem onClick={handleClickUpdateUser}>Editar</MenuItem> : null}
                {!props.notDelete ? <MenuItem onClick={handleClickDeleteUser}>Deletar</MenuItem> : null}
                {(props.notEdit && props.notDelete) ? props.updateComponent : ''}

            </Menu>
        </div>
    );
}
