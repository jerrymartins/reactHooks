import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from './components/Navbar';
import Main from "./components/Main";
import Login from "./components/login/Index";
import Grid from '@material-ui/core/Grid';
import { BrowserRouter } from 'react-router-dom';
import {useSelector} from "react-redux";
import {Container} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    main: {
      paddingTop: theme.spacing(5)
    },
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function App() {
    const loginState = useSelector( state => state.login);
    const classes = useStyles();

    const templateApp =
        <BrowserRouter>
            <Navbar/>
            <Container className={classes.main} maxWidth="lg">
                <Main/>
            </Container>
        </BrowserRouter>;

    const login = <Login/>;

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    {loginState.logged ? templateApp : login}
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
