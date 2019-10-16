import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {red} from "@material-ui/core/colors";
import FilmMenu from "./FilmMenu";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        maxHeight: 345,
        minHeight: 345,
        overflow: 'auto'
        // maxHeight: 340,
        // minHeight: 340
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function ImgMediaCard(props) {
    const classes = useStyles();

    const [state, setState] = useState(props.mediaUrl);
    const [cardMediaState, setCardMediaState] = useState(<CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="140"
        image={state.info.image_url}
        title="vídeo homem aranha"
    />);


    // useEffect(() => {
    //
    // }, [state]);

    const setToTrailer = () => {
        setCardMediaState(
            <CardMedia
                component="iframe"
                alt="Contemplative Reptile"
                height="140"
                src={state.info.video_url}
                title="vídeo homem aranha"
            />
        );
    };

    const setToImage = () => {
        setCardMediaState(
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={state.info.image_url}
                title="vídeo homem aranha"
            />
        );
    };

    useEffect(() => {
    }, [cardMediaState, state]);
    return (
        <Card className={classes.card}>
            <CardActionArea>
                {cardMediaState}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {state.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" style={{overflow: 'auto', maxHeight:'70px'}}>
                        {state.info.sinopse}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={setToImage}>
                    Cartaz
                </Button>
                <Button size="small" color="primary" onClick={setToTrailer}>
                    Trailer
                </Button>
                <FilmMenu filmData={state}/>
            </CardActions>
        </Card>
    );
}
