import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import UserRegisterForm from "./User-register-form";
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    btnNewFilm: {
        position: 'relative',
        top: theme.spacing(-3)
    },
    appBar: {
        position: 'relative'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
    const classes = useStyles();
    const userState = useSelector( state => state.user);
    const dispatch = useDispatch();

    function handleClickOpenRegisterUser() {
        dispatch({type: 'DIALOG_USER', ...{dialog_open: true, operation: 'data_register'}})
    }

    function handleClose() {
        dispatch({type: 'DIALOG_USER', ...{dialog_open: false, operation: '', user: {}, userId: null,}})
    }
    function handleCloseCancel() {
        dispatch({type: 'DIALOG_USER', ...{dialog_open: false, operation: 'cancel', user: {}, userId: null,}})
    }
    return (
        <div>
            <Button className={classes.btnNewFilm} variant="outlined" color="primary" onClick={handleClickOpenRegisterUser}>
                Cadastrar Filme
            </Button>
            <Dialog fullScreen open={userState.dialog_open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleCloseCancel} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Novo Usuário
                        </Typography>
                        {/*<Button color="inherit" onClick={handleClose}>*/}
                        {/*    salvar*/}
                        {/*</Button>*/}
                    </Toolbar>
                </AppBar>

                <Container maxWidth="sm">
                    <UserRegisterForm user={userState.user}/>
                </Container>

            </Dialog>
        </div>
    );
}
