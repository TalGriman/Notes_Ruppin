import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    nav: {
        background: 'linear-gradient(45deg, #141e30 30%, #243b55 90%)'

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const FCAppbar = (props) => {
    const classes = useStyles();

    const loginPage = () => {
        props.history.push({
            pathname: '/'
        });
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.nav}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        A.T - Notes
            </Typography>
                    {
                        props.isLoggedIn ?
                            <Button onClick={props.isLoggedOut} color="inherit">Logout</Button>
                            :
                            <Button onClick={loginPage} color="inherit">Login</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withRouter(FCAppbar);