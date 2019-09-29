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
import Snackbar from "@material-ui/core/Snackbar";
import {useDispatch, useSelector} from "react-redux";
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import AvatarDefault from '../../../assets/vegeta_default.png';
import api from "../../../services/api";

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
    bigAvatar: {
        marginTop: 10,
        marginLeft: 0,
        marginRight: 20,
        marginBottom: 10,
        width: 90,
        height: 90,
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
    const [stateProfiles, setStateProfiles] = useState(
        [{ value: "admin", label: "Administrador" },
            { value: "user", label: "Usuário" },
            ]
    );
    const stateUser = useSelector(state => state.user);

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
            .when('userEdit', {
                is: userEdit => userEdit === false,
                then: Yup.string()
                    .min(8, 'Mínimo de 8 caracteres para senha')
                    .max(20, 'Máximo de 20 caracteres para senha')
                    .required('Informe uma senha'),
                otherwise: Yup.string()
            }),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Senhas não são iguais')
    });

    const handleChangeUserStatus = name => event => {
        setUserState({ ...chekUserStatus, [name]: event.target.checked });
    };

    const save = (data) => {
        const user = {
            "Item": {
                "email": data.email,
                "user": data.user,
                "password": data.password,
                "info": {
                    "profile": data.profile,
                    "image_url": data.image_url,
                    "status": chekUserStatus.status
                }
            }
        };
        api.post('users', user).then( success => {
            setStateSnackBar({ open: true, message: 'operação finalizada' });

            setTimeout(() => {
                setStateSnackBar({ open: false });
                dispatch({type: 'USER', ...{dialog_open: false, loadData: true}});
            }, 2000);
        }).catch(err => {
            setStateSnackBar({ open: true, message: 'Erro ao cadastrar usuário' });
            setTimeout(() => {
                setStateSnackBar({ open: false });
                dispatch({type: 'USER', ...{dialog_open: false, loadData: false}});
            }, 2000);
        })
    };

    useEffect(() => {

    }, []);

    return (
        <div>
            <h1>Cadastro de usuário</h1>
            <Formik
                initialValues={{
                    userEdit: stateUser.user && stateUser.user.email ? stateUser.user.email : '',
                    user: stateUser.user && stateUser.user ? stateUser.user.user : '',
                    email: stateUser.user && stateUser.user ? stateUser.user.email : '',
                    profile: stateUser.user && stateUser.user.info ? stateUser.user.info.profile : '',
                    password: '',
                    status: stateUser.user && stateUser.user.info && stateUser.user.info.status? stateUser.user.info.status : chekUserStatus.status,
                    image_url: stateUser.user && stateUser.user.info && stateUser.user.info.image_url ? stateUser.user.info.image_url : 'notimage',
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
                        <Box display="flex" flexDirection="row">
                            <Box flexDirection="column" alignItems="flex-start">
                                <Avatar alt="Remy Sharp" src={AvatarDefault} className={classes.bigAvatar} />
                            </Box>

                            <Box flexDirection="column" alignItems="flex-end">
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

                            </Box>

                        </Box>

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
