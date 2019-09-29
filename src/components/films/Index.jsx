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
                {[
                    {url_image: 'https://s3dynamox.s3.amazonaws.com/237775-de-homem-aranha-de-volta-ao-lar-se-l-diapo-2.jpg',
                     url_video: 'https://s3dynamox.s3.amazonaws.com/Homem-Aranha_+Longe+de+Casa+_+Trailer+Oficial+%232+_+DUB+_+04+de+julho+nos+cinemas.mp4'
                    },
                    {url_image: 'https://s3dynamox.s3.amazonaws.com/4lqbvbx8ga5smyt55n7o4qaladimwis.jpg',
                        url_video: 'https://s3dynamox.s3.amazonaws.com/y2mate.com+-+will_smith_friend_like_me_from_aladdin_1at7kKzBYxI_360p.mp4'
                    }
                ]
                    .map((item, i) => <Grid item key={i}>
                                <CardView
                                    mediaUrl={item}
                                    xs={3} key={i}/>
                               </Grid> )}

            </Grid>
        </div>
    )
}


//https://s3dynamox.s3.amazonaws.com/4lqbvbx8ga5smyt55n7o4qaladimwis.jpg

//https://s3dynamox.s3.amazonaws.com/y2mate.com+-+will_smith_friend_like_me_from_aladdin_1at7kKzBYxI_360p.mp4
