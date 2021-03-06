import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import {makeStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Snackbar from "@material-ui/core/Snackbar";
import {useDispatch} from "react-redux";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import AvatarDefault from "../../../assets/defaultimagefilm.png";
import api from "../../../services/api";
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 435,
    },
    textArea: {
        minWidth: 517
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(60),

    },
    inputLabel: {
        marginTop: theme.spacing(3),
    },
    formRadioButtom: {
        margin: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    bigAvatar: {
        marginTop: 10,
        marginLeft: 0,
        marginRight: 20,
        marginBottom: 10,
        width: 90,
        height: 90,
        cursor: 'pointer'
    },
    progress: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(10)
    }
}));

export default function FilmRegisterForm(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);

    const [sendingImage, setSendingImage] = useState(false);
    const [sendingVideo, setSendingVideo] = useState(false);
    const [sendingFilm, setSendingFilm] = useState(false);

    const [stateSnackBar, setStateSnackBar] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: ''
    });

    const FilmSchema = Yup.object().shape({
        filmEdit: Yup.bool(),
        title: Yup.string()
            .min(2, 'Titulo muito pequeno')
            .max(50, 'Titulo muito grande')
            .required('Informe um nome'),
        yearFilm: Yup.string()
            .required('Informe o ano de lançamento'),
        sinopse: Yup.string()
            .required('Informe a sinopse'),
        url_image: Yup.object(),
        video_url: Yup.object()
    });

    const handleChangeVideo = (evt) => {
        setVideo({fileToUpload: evt.target.files[0]})
    };

    const videoUpload = () => {
        var formData = new FormData();
        formData.append("file", video.fileToUpload);
        return api.post('file/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };

    const handleChange = (evt) => {
        setImage({file: URL.createObjectURL(evt.target.files[0]), fileToUpload: evt.target.files[0]})
    };

    const imageUpload = () => {
        var formData = new FormData();
        formData.append("file", image.fileToUpload);
        return api.post('file/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    };


    const filmSave = (data) => {
        const restOp = data.filmEdit ? api.put : api.post;
        return restOp(`/films`, {...data});
    };

    const save = (data) => {
        const film = {
            "Item": {
                "yearFilm": data.yearFilm,
                "title": data.title,
                "info": {
                    "video_url": data.video_url,
                    "image_url": 'without',
                    "sinopse": data.sinopse
                }
            }
        };

        if (image) {
            setSendingImage(true);
            imageUpload().then( imageLocation => {
                setSendingImage(false);
                film.Item.info.image_url = imageLocation.data;

                setSendingVideo(true);
                videoUpload().then( videoLocation => {
                    setSendingVideo(false);
                    film.Item.info.video_url = videoLocation.data;

                    setSendingFilm(true);
                    filmSave(film).then( res => {
                        setSendingFilm(false);
                        setStateSnackBar({ open: true, message: 'filme salvo' });
                        setImage({});
                        setTimeout(() => {
                            setStateSnackBar({ open: false });
                            dispatch({type: 'USER', ...{operation: 'create', userId: null, dialog_open: false, user: {}}});
                        }, 2000);
                    }).catch(err => {
                        console.log(err)
                    });

                }).catch( err => console.log(err));

            }).catch(err => {
                setStateSnackBar({ open: true, message: 'Erro ao cadastrar filme' });
                setTimeout(() => {
                    setStateSnackBar({ open: false });
                    dispatch({type: 'USER', ...{operation: 'create', userId: null, dialog_open: false, user: {}}});
                }, 2000);
            });
        } else {
            videoUpload().then( videoLocation => {
                film.Item.info.video_url = videoLocation.data;

                filmSave(film).then( res => {
                    setStateSnackBar({ open: true, message: 'filme salvo' });
                    setImage({});
                    setTimeout(() => {
                        setStateSnackBar({ open: false });
                        dispatch({type: 'USER', ...{operation: 'create', userId: null, dialog_open: false, user: {}}});
                    }, 2000);
                }).catch(err => {
                    console.log(err)
                });

            }).catch( err => console.log(err));
        }
    };

    return (
        <div>
            <h1>Cadastro de Filme</h1>
            <Formik
                initialValues={{
                    filmEdit: false,
                    title: '',
                    yearFilm: '',
                    sinopse: '',
                    url_image: '',
                    video_url: ''
                }}
                validationSchema={FilmSchema}
                onSubmit={values => {
                    const data = {
                        ...values
                    };
                    save(data);

                }}

                render={() => (
                    <Form className={classes.container} noValidate autoComplete="off">
                        <Box display="flex" flexDirection="row">
                            <Box flexDirection="column" alignItems="flex-start">
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    multiple={false}
                                    type="file"
                                    onChange={(event => handleChange(event))}
                                />
                                <label htmlFor="raised-button-file">
                                    <Avatar alt="Remy Sharp" src={image === null ? AvatarDefault : image.file} className={classes.bigAvatar} htmlFor="raised-button-file"/>
                                </label>
                            </Box>

                            <Box flexDirection="column" alignItems="flex-end">
                                <Field
                                    label="Titulo"
                                    //className={classes.textField}
                                    fullWidth
                                    name="title"
                                    component={TextField}/>

                                <Field
                                    label="Ano de lançamento"
                                    //className={classes.textField}
                                    fullWidth
                                    name="yearFilm"
                                    component={TextField}/>

                            </Box>

                        </Box>

                        <Field
                            label='Sinopse'
                            className={classes.textArea}
                            fullWidth
                            name="sinopse"
                            aria-label="minimum height" rows={3}
                            component={'textarea'}/>

                        <input
                            label='url do video'
                            //className={classes.textField}
                            fullWidth

                            multiple={false}
                            type="file"
                            onChange={(event => handleChangeVideo(event))}/>

                        <Button type="submit" color="primary" className={classes.button}>
                            Salvar
                        </Button>

                    </Form>
                )}
            />

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                key={'bottom-center'}
                open={stateSnackBar.open}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{stateSnackBar.message || 'operação realizada com sucesso'}</span>}/>

                <div className={classes.progress}>
                    <LinearProgress hidden={!sendingImage && !sendingVideo && !sendingFilm}/>
                    <span hidden={!sendingImage}>enviando a foto</span>
                    <span hidden={!sendingVideo}>enviando o vídeo</span>
                    <span hidden={!sendingFilm}>Salvando Filme</span>
                </div>

        </div>
    )
}
