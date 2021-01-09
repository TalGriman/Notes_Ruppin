import React from 'react';
import { withRouter } from 'react-router-dom';
import User from '../Classes/User';
import { Grid, Paper, TextField, Button, Typography } from '@material-ui/core';

class CCRegister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            existUser: "",
            checkPassowrd: "",
            rgxPassword: "",
            rgxEmail: ""
        };
    };

    changeInput = (e, index) => {
        if (index === 0) {
            this.setState({ email: e.target.value })
        }
        else if (index === 1) {
            this.setState({ password: e.target.value })
        }
        else {
            this.setState({ confirmPassword: e.target.value })
        }
    };

    sendUser = () => {
        const emailRgx = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,15}(?:\.[a-zA-Z]+){1,2}$/;
        const passwordRgx = /^(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&*_=@])[A-Za-z0-9!#$%&*_=@]{7,}$/;

        if (!emailRgx.test(this.state.email)) {
            this.setState({ rgxEmail: "Invalid email format!", rgxPassword: "", existUser: "", checkPassowrd: "" });
            return;
        }

        this.setState({ rgxEmail: "" });

        if (!passwordRgx.test(this.state.password)) {
            this.setState({ rgxPassword: "Password must include at least one capital letter, one number and one special character (!#$%&*_=@)", existUser: "", checkPassowrd: "" });
            return;
        }

        this.setState({ rgxPassword: "" });

        let confirmPassword = this.state.password === this.state.confirmPassword;

        if (!confirmPassword) {
            this.setState({ checkPassowrd: "confirm password does not match!", existUser: "" });
            return;
        }

        this.setState({ checkPassowrd: "" });

        let existUser = this.props.users.find((user) => user.email.toUpperCase() === this.state.email.toLocaleUpperCase()) !== undefined;

        if (existUser) {
            this.setState({ existUser: "This user is already exists!" });
            return;
        }

        this.props.addUser(new User(this.state.email, this.state.password, []));

        this.setState({ existUser: "", email: "", password: "", confirmPassword: "", checkPassowrd: "", rgxPassword: "", rgxEmail: "" });

        this.props.history.push({
            pathname: '/',
        });

    };

    render() {
        const inputs = ["Email", "Password", "Confirm password"];
        const renderedInputs = inputs.map((input, index) => {
            return (
                <Grid item xs={12} key={index} style={{ marginTop: "10px" }}>
                    <TextField
                        size="small"
                        type={index === 0 ? 'text' : 'password'}
                        fullWidth
                        label={input}
                        variant="outlined"
                        value={index === 0 ? this.state.email : index === 1 ? this.state.password : this.state.confirmPassword}
                        onChange={(e) => this.changeInput(e, index)}
                    />
                    <Typography variant="subtitle1" style={{ marginTop: 10, color: `red` }}>
                        {index === 0 ? this.state.rgxEmail : null}
                        {index === 1 ? this.state.rgxPassword : null}
                        {index === 2 ? this.state.checkPassowrd : null}
                    </Typography>
                </Grid>
            );
        });

        return (
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12} sm={6} md={5} style={{ marginTop: "20px" }}>
                    <Paper elevation={3} style={{ padding: "10px" }}>
                        <Typography variant="h4">
                            Register
                        </Typography>
                        {renderedInputs}
                        <Typography variant="subtitle1" style={{ marginTop: 10, color: `red` }}>
                            {this.state.existUser}
                        </Typography>
                        <Grid item xs={12}>
                            <Button onClick={this.sendUser} style={{ margin: "10px 0px" }} variant="contained">Registar</Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        );
    };
};

export default withRouter(CCRegister);
