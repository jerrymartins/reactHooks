import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch} from "react-redux";
import './Style.css'
import LinearProgress from '@material-ui/core/LinearProgress';
import api from "../../services/api";

import {Formik, Field, Form} from 'formik';
import {
    TextField,
} from 'formik-material-ui';
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    progress: {
        marginTop: theme.spacing(5),
    }
}));

export default props => {
    const [stateSnackBar, setStateSnackBar] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const [stateProgressBar, setStateProgressBar] = useState('');

    const dispatch = useDispatch();
    const classes = useStyles();

    //login automático
    dispatch({type:'LOGIN',...{
            logged: true,
            user: 'jerry martins',
            urlImage:'url/image/photo.jpg'}
    });

    const login = (body) => {
        const req = {user: 'luiz', pwd: '123'};
        setStateProgressBar(<LinearProgress className={classes.progress}/>);
        api.post(`/login`, req).then( res => {
            //login deve ser confirmado antes do dispatch
            if (res.data.token) {
                dispatch({
                    type:'LOGIN',...{
                        logged: true,
                        user: 'Jerry Martins',
                        email: 'zeroumbin@gmail.com',
                        profile: 'admin',
                        status: true,
                        url_image: 'https://dynamoxs3storage.s3.amazonaws.com/xu29icuig9fvot4plbqss237775-de-homem-aranha-de-volta-ao-lar-se-l-diapo-2.jpg',
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTY5NDc2Mjk5LCJleHAiOjE1Njk0NzY1OTl9.RQTi1gd-x0J-0dEKgi4E3o3xT7amtckjHIV_VtUogJ8'
                    }
                })
                //pegar dados do usuário
                // api.get(`api/login/users?operation=RC&userId=${res.data.RETURN}`)
                //     .then( user => {
                //         console.log(user.data[0]);
                //         dispatch({
                //                     type:'LOGIN',...{
                //                     logged: false,
                //                     user: 'Jerry Martins',
                //                     email: 'zeroumbin@gmail.com',
                //                     profile: 'admin',
                //                     status: true,
                //                     url_image: 'https://dynamoxs3storage.s3.amazonaws.com/xu29icuig9fvot4plbqss237775-de-homem-aranha-de-volta-ao-lar-se-l-diapo-2.jpg',
                //                     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTY5NDc2Mjk5LCJleHAiOjE1Njk0NzY1OTl9.RQTi1gd-x0J-0dEKgi4E3o3xT7amtckjHIV_VtUogJ8'
                //                   }
                //         })
                // }).catch(err => console.log(err));

            } else {
                setStateProgressBar('');
                setStateSnackBar({ open: true });
                setTimeout(() => {
                    setStateSnackBar({ open: false });
                }, 3000);
            }
        }).catch(err => console.log(err));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        select: 'none',
                        tags: [],
                        rememberMe: true,
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.password) {
                            errors.password = 'Password Required';
                        }
                        if (!values.email) {
                            errors.email = 'Email Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting}) => {
                        const formData = values;
                            setSubmitting(false);
                            const body = {
                                email: formData.email,
                                password: formData.password
                            };
                            login(body);
                    }}

                    render={({submitForm, isSubmitting, values, setFieldValue}) => (
                        <Form>
                            <Field
                                name="email"
                                type="email"
                                label="Email"
                                component={TextField}
                            />
                            <br />
                            <Field
                                type="password"
                                label="Password"
                                name="password"
                                component={TextField}
                            />
                            <br />

                            {isSubmitting && <LinearProgress />}
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                            >
                                Entrar
                            </Button>
                        </Form>
                    )}
                />
            </div>

            {stateProgressBar}

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                key={'bottom-center'}
                open={stateSnackBar.open}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Credenciais inválidas</span>}/>
        </Container>
    );
}
