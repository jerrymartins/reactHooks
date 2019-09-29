import React, {useEffect, useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import { Select } from "material-ui-formik-components/Select";
import {makeStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import environment from 'environment';
import Snackbar from "@material-ui/core/Snackbar";
import {useDispatch} from "react-redux";

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
}));

export default function UserRegisterForm(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [chekUserStatus, setUserState] = useState({status: false});
    const [stateSnackBar, setStateSnackBar] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: ''
    });
    const [stateProfiles, setStateProfiles] = useState([{admin: 'admin'}, {usuario: 'usuario'}]);
    const [stateUser, setStateUser] = useState({});

    const SignupSchema = Yup.object().shape({
        userEdit: Yup.bool(),
        user: Yup.string()
            .min(3, 'Nome muito pequeno')
            .max(50, 'Nome muito grande')
            .required('Informe um nome')
            .matches(/^[A-Za-z ]+$/,{ message: 'somente letras, sem espaço no início e final', excludeEmptyString: true }),
        email: Yup.string()
            .email('Email inválido')
            .required('Informe um email'),
        password: Yup.string()
            .when('userId', {
                is: userId => userId === '',
                then: Yup.string()
                    .min(8, 'Mínimo de 8 caracteres para senha')
                    .max(20, 'Máximo de 20 caracteres para senha')
                    .required('Informe uma senha'),
                otherwise: Yup.string()
            }),
        confirmPassword: Yup.string()
            .when('userId', {
                is: userId => userId === '',
                then: Yup.string()
                    .oneOf([Yup.ref('userPassword'), null], 'Senhas não são iguais'),
                otherwise: Yup.string()
            })
    });

    const handleChangeUserStatus = name => event => {
        setUserState({ ...chekUserStatus, [name]: event.target.checked });
    };

    const save = (data) => {
        if (data.userId) {
            data.operation = 'U';

            if (!data.userPassword) {
                delete data.userPassword;
                delete data.userConfirmPassword
            }
        } else {
            delete data.userId;
        }
        const restOp = (props.user && props.user.USE_USER_ID) ? axios.put : axios.post;
        restOp(`${environment.api.api_url}/users`, {...data})
            .then( res => {
                setStateSnackBar({ open: true, message: res.data[0].MESSAGE || 'operação finalizada' });

                setTimeout(() => {
                    setStateSnackBar({ open: false });
                    dispatch({type: 'CREATE_USER', ...{operation: 'create', userId: null, dialog_open: false, user: {}}});
                }, 2000);

            }).catch( err => {
                console.log(err);
                setStateSnackBar({ open: true, message: 'Erro ao cadastrar usuário' });
                // setTimeout(() => {
                //     setStateSnackBar({ open: false });
                //     dispatch({type: 'CREATE_USER', ...{operation: 'create', userId: null, dialog_open: false, user: {}}});
                // }, 2000);
        })
    };

    useEffect(() => {
        console.log(props.user);
        if (props.user && props.user.USE_USER_ID) {
            setStateUser(props.user);
        }
    }, [props.user]);

    return (
        <div>
            <h1>Cadastro de Filme</h1>
            <Formik
                initialValues={{
                    userEdit: false,
                    user: '',
                    email: '',
                    profile: 'admin',
                    password: '',
                    status: true,
                    image_url: 'https://dynamoxs3.s3-us-west-2.amazonaws.com/tlha3pktlfr5qk584t6vlgrocketseat.png',
                    confirmPassword: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    const data = {
                        ...values
                    };
                    save(data);

                }}

                render={props => (
                    <Form className={classes.container} noValidate autoComplete="off">
                        <Field
                            label="Nome"
                            //className={classes.textField}
                            fullWidth
                            name="user"
                            component={TextField}/>

                        <Field
                            label="Email"
                            //className={classes.textField}
                            fullWidth
                            name="email"
                            type="email"
                            component={TextField}/>

                        <Field
                            label={(stateUser && stateUser.USE_USER_ID) ? 'Preencha para alterar' : 'Senha'}
                            //className={classes.textField}
                            fullWidth
                            name="password"
                            type="password"
                            component={TextField}/>

                        <Field
                            label={(stateUser && stateUser.USE_USER_ID) ? 'Preencha para alterar' : 'Confirmação de senha'}
                            //className={classes.textField}
                            fullWidth
                            name="confirmPassword"
                            type="password"
                            component={TextField}/>

                        <FormControl className={classes.formControl}>
                            <Field
                                required
                                name="profile"
                                label="Perfil"
                                options={stateProfiles}
                                component={Select}
                            />
                        </FormControl>

                        <InputLabel className={classes.inputLabel}>Usuário ativo
                            <Switch
                                name='status'
                                checked={chekUserStatus.status}
                                onChange={handleChangeUserStatus('status')}
                                value="status"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </InputLabel>

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
        </div>
    )
}
