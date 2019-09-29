import React, {useEffect, useState} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { lighten, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuFilterSearch from "../menuFilterSearch/Index";
import {useDispatch} from "react-redux";
import useDebounce from "../../../utils/useDebounce";

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
}));
const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);


    useEffect(
        () => {
            dispatch({type: 'USERS', ...{param: debouncedSearchTerm}});
        },
        [debouncedSearchTerm]
    );

    const filterAndSearch = (
        <React.Fragment>
            <TextField
                id="standard-name"
                label="Pesquisar"
                className={''}
                onChange={e => setSearchTerm(e.target.value)}
                margin="normal"
                value={searchTerm}
            />
            <div className={classes.actions}>
                <MenuFilterSearch/>
            </div>
        </React.Fragment>
    );

    return (
        <Toolbar className={classes.root}>
            <div className={classes.title}>
                <Typography variant="h6" id="tableTitle">
                    {props.tableName}
                </Typography>
            </div>
            <div className={classes.spacer} />
            {props.withoutFilter !== true ? filterAndSearch : ''}
        </Toolbar>
    );
};

export default EnhancedTableToolbar;
