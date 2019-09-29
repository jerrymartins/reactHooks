import React, {useEffect, useState} from "react";
import { Grid } from '@material-ui/core';
import FullScreenDialog from "./register/Index";
import CardView from './card-view/CardView';
import {useDispatch, useSelector} from "react-redux";
import api from "../../services/api";

const buttonFilterList = [{label: 'id', value: 'idUser'}, {label: 'nome', value: 'userName'}, {label: 'email', value: 'userEmail'}];

export default props => {
    const dispath = useDispatch();
    const filmsSelector = useSelector(state => state.data);
    dispath({type: "BUTTON_NEW_LIST", values: buttonFilterList, default: 'userName', reducer: 'USERS'});
    dispath({type: 'USERS', ...{filterBy: 'userName', param: ''}});
    const [filmsState, setFilmsState] = useState([]);

    // api.get('films').then( films => {
    //     setFilmsState({films: films.data.Items});
    // }).catch(err => {
    //     console.log(err);
    // });

    useEffect(() => {
        const fetchData = async () => {
            const films = await api.get('films');
            setFilmsState(films.data.Items)
        };
        fetchData();
    });


    return(
        <div>
            <FullScreenDialog/>
            <Grid container spacing={3}>
                {
                    // [
                    //     {
                    //         title: 'Homem Aranha longe do lar',
                    //         yearFilm: '2019',
                    //         sinopse: 'Peter Parker está em uma viagem de duas semanas pela Europa, ao lado de seus amigos de colégio, quando é surpreendido pela visita de Nick Fury.',
                    //         url_image: 'https://s3dynamox.s3.amazonaws.com/237775-de-homem-aranha-de-volta-ao-lar-se-l-diapo-2.jpg',
                    //         url_video: 'https://s3dynamox.s3.amazonaws.com/Homem-Aranha_+Longe+de+Casa+_+Trailer+Oficial+%232+_+DUB+_+04+de+julho+nos+cinemas.mp4'
                    //     },
                    //     {
                    //         title: 'Aladim',
                    //         yearFilm: '2019',
                    //         sinopse: 'Aladdin liberta o gênio da lâmpada e tem seus desejos atendidos. Porém, ele logo descobre que o diabo tem outros planos para a lâmpada - e para a princesa Jasmim.',
                    //         url_image: 'https://s3dynamox.s3.amazonaws.com/4lqbvbx8ga5smyt55n7o4qaladimwis.jpg',
                    //         url_video: 'https://s3dynamox.s3.amazonaws.com/y2mate.com+-+will_smith_friend_like_me_from_aladdin_1at7kKzBYxI_360p.mp4'
                    //     }
                    // ]
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


//https://s3dynamox.s3.amazonaws.com/4lqbvbx8ga5smyt55n7o4qaladimwis.jpg

//https://s3dynamox.s3.amazonaws.com/y2mate.com+-+will_smith_friend_like_me_from_aladdin_1at7kKzBYxI_360p.mp4
