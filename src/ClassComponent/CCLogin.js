import { Grid, Paper, TextField, Button, Typography } from '@material-ui/core';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';


class CCLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loginUserMessage: ""
        };
    };

    changeInput = (e, index) => {
        if (index === 0) {
            this.setState({ email: e.target.value })
        }
        else {
            this.setState({ password: e.target.value })
        }
    };

    login = () => {
        let userLogIn = this.props.users.find((user) => user.email.toUpperCase() === this.state.email.toUpperCase() && user.password === this.state.password) !== undefined;

        if (!userLogIn) {
            this.setState({ loginUserMessage: "Wrong details!" });
            return;
        }

        this.setState({ loginUserMessage: "", email: "", password: "" });

        this.props.isLoggedIn();

        this.props.history.push({
            pathname: '/Main',
            state: { email: this.state.email }
        });
    };



    render() {
        const inputs = ["Email", "Password"];
        const renderedInputs = inputs.map((input, index) => {
            return (
                <Grid item xs={12} key={index} style={{ marginTop: "10px" }}>
                    <TextField
                        size="small"
                        type={index === 0 ? 'text' : 'password'}
                        fullWidth 
                        label={input}
                        variant="outlined"
                        value={index === 0 ? this.state.email : this.state.password}
                        onChange={(e) => this.changeInput(e, index)}
                    />
                </Grid>
            );
        });

        return (
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12} sm={6} md={5} style={{ marginTop: "20px" }}>
                    <Paper elevation={3} style={{ padding: "10px" }}>
                        <Typography variant="h4">
                            Login
                        </Typography>
                        {renderedInputs}
                        <Typography variant="subtitle1" style={{ marginTop: 10, color: `red` }}>
                            {this.state.loginUserMessage}
                        </Typography>
                        <Grid item xs={12}>
                            <Button onClick={this.login} style={{ margin: "10px 0px" }} variant="contained">Login</Button>
                        </Grid>
                        <Typography>
                            <Link style={{ textDecoration: "none", color: "black" }} to="/Register">Press here to register</Link>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        );
    };
};

export default withRouter(CCLogin);
