import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import {UsersIcon, DashboardIcon} from "../assets/icons/icons";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function SideBar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {[
                    {menuItem:'DashBoard', url: '/', icon: <DashboardIcon/>},
                    {menuItem:'Usuários', url: '/users', icon: <UsersIcon/>},
                    {menuItem:'Filmes', url: '/films', icon: <UsersIcon/>},
                ].map((item, index) => (

                    <ListItem button key={item.menuItem} >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <Link to={item.url} style={{ textDecoration: 'none', color: 'rgba(0,0,0,.54)' }}>
                            <ListItemText primary={item.menuItem} />
                        </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <MenuIcon onClick={toggleDrawer('left', true)}/>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}
