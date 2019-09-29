import React from "react";
import { Grid } from '@material-ui/core';
import FullScreenDialog from "./register/Index";
import CardView from './card-view/CardView';
import {useDispatch} from "react-redux";

const buttonFilterList = [{label: 'id', value: 'idUser'}, {label: 'nome', value: 'userName'}, {label: 'email', value: 'userEmail'}];

export default props => {
    const dispath = useDispatch();
    dispath({type: "BUTTON_NEW_LIST", values: buttonFilterList, default: 'userName', reducer: 'USERS'});
    dispath({type: 'USERS', ...{filterBy: 'userName', param: ''}});
    return(
        <div>
            <FullScreenDialog/>
            <Grid container spacing={3}>
                {[1,2,3]
                    .map(i => <Grid item key={i}>
                                <CardView
                                    mediaUrl={{url_image: 'https://dynamoxs3storage.s3.amazonaws.com/xu29icuig9fvot4plbqss237775-de-homem-aranha-de-volta-ao-lar-se-l-diapo-2.jpg',
                                        url_video: 'https://dynamoxs3storage.s3.amazonaws.com/Homem-Aranha_+Longe+de+Casa+_+Trailer+Oficial+%232+_+DUB+_+04+de+julho+nos+cinemas.mp4'}}
                                    xs={3} key={i}/>
                               </Grid> )}

            </Grid>
        </div>
    )
}

