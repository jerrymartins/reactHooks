import React, {useEffect, useState} from "react";
import { Grid } from '@material-ui/core';
import FullScreenDialog from "./register/Index";
import CardView from './card-view/CardView';
import {useDispatch, useSelector} from "react-redux";
import api from "../../services/api";

const buttonFilterList = [{label: 'id', value: 'idUser'}, {label: 'nome', value: 'userName'}, {label: 'email', value: 'userEmail'}];

export default props => {
    const dispath = useDispatch();
    const filmsSelector = useSelector(state => state.user);
    dispath({type: "BUTTON_NEW_LIST", values: buttonFilterList, default: 'userName', reducer: 'USERS'});
    dispath({type: 'USERS', ...{filterBy: 'userName', param: ''}});
    const [filmsState, setFilmsState] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const films = await api.get('films');
            setFilmsState(films.data.Items)
        };
        fetchData();
    }, [filmsSelector]);

    return(
        <div>
            <FullScreenDialog/>
            <Grid container spacing={3}>
                {
                    filmsState
                    .map((item, i) => <Grid item key={i}>
                                <CardView
                                    mediaUrl={item}
                                    xs={3} key={i}/>
                               </Grid> )}

            </Grid>
        </div>
    )
}
