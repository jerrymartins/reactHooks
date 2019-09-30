import React, {useEffect, useState} from "react";
import { Grid } from '@material-ui/core';
import FullScreenDialog from "./register/Index";
import Table from "../table/Index";
import {useDispatch, useSelector} from "react-redux";
import axiosApi from "../../services/api";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import SimpleMenu from "../table/menu/Index";

//proposta de estrutura para reutilizar o componente <Table/>
function createData(user, email, profile, status, opcoes) {
    return { user, email, profile, status, opcoes };
}

const headCells = [
    { id: 'user', numeric: false, disablePadding: false, label: 'Nome' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'profile', numeric: false, disablePadding: false, label: 'Perfil' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
    { id: 'opcoes', numeric: false, disablePadding: false, label: 'Opções' }
];

const columnsNames = ['user', 'email', 'profile', 'status', 'opcoes'];

const buttonFilterList = [{label: 'id', value: 'idUser'}, {label: 'nome', value: 'userName'}, {label: 'email', value: 'userEmail'}];

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
        position: 'absolute'
    },
}));
export default () => {
    const classes = useStyles();
    const dispath = useDispatch();
    const [isSearching, setIsSearching] = useState(true);
    let rows = [];
    const userState = useSelector(state => state.user);

    useEffect( () => {
        if (userState.loadData) {
            axiosApi.get('users').then( res => {
                rows = res.data.Items.map( row => createData(
                    row.user,
                    row.email,
                    row.info.profile,
                    row.info.status ? 'Ativo': 'Inativo',
                    <SimpleMenu pathdelete={`users/${row.user}/${row.email}`} row={row}/>));
                dispath({type: 'NEW_TABLE_DATA', ...{rows, headCells, columnsNames, tableName:'Usuários'}});
                setIsSearching(false);
            }).catch( err => {
                setIsSearching(false);
            });
        }
    }, [userState]);

    return(
        <div>
            <FullScreenDialog/>
            <Grid container spacing={3}>
                {isSearching ? <CircularProgress className={classes.progress}/> : ''}
                <Table/>
            </Grid>
        </div>
    )
}
