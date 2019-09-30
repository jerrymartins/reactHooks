import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SideBar from "./SideBar";
import {useDispatch, useSelector} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import defaultAvatar from "../assets/vegeta_default1.png"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    navbar: {
        backgroundColor: 'rgb(20, 20, 20)'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textDecoration: 'none',
        fontSize: '1.8em',
        color: '#E50914',
        display: 'inline-block',
        verticalAlign: 'middle',
        cursor: 'pointer',
        marginRight: '5px'
            },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    }
}));

export default function Navbar() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const loginState = useSelector(state => state.login);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function logout() {
        dispatch({type: "LOGOUT"})
    }

    useEffect(() => {
        console.log(loginState)
    }, [loginState])
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <SideBar/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        TRAILIX
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar alt="Remy Sharp" src={loginState.logged ? loginState.url_image : defaultAvatar} className={classes.bigAvatar} />
                            {loginState.user}

                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Perfil</MenuItem>
                            <MenuItem onClick={logout}>Sair</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
