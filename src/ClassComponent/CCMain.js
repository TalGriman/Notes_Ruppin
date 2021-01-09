import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Note from '../Classes/Note';
import { Grid, Paper, TextField, Button, Typography } from '@material-ui/core';

class CCMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            user: {},
            emptyDetailsMessage: ""
        };
    }

    changeInput = (e, index) => {
        if (index === 0) {
            this.setState({ title: e.target.value })
        }
        else {
            this.setState({ description: e.target.value })
        }
    };

    addNote = () => {
        if (this.state.title === "" || this.state.description === "") {
            this.setState({ emptyDetailsMessage: "details cannot be empty!" });
            return;
        }

        this.setState({ emptyDetailsMessage: "" });

        let user = this.props.users.find((user) => user.email.toUpperCase() === this.props.location.state.email.toUpperCase());
        user.addNote(new Note(this.state.title, this.state.description));
        this.setState({ user: user });
        this.props.history.push({
            pathname: '/Notes',
            state: { notes: user.notes, email: user.email }
        });
    };

    componentDidMount() {
        if (this.props.isLoggedIn) {
            let user = this.props.users.find((user) => user.email.toUpperCase() === this.props.location.state.email.toUpperCase());
            this.setState({ user: user });
        }
        else {
            this.props.history.push({
                pathname: '/'
            })
        }
    }


    render() {
        const inputs = ["Title", "Description"];
        const renderedInputs = inputs.map((input, index) => {
            return (
                <Grid item xs={12} key={index} style={{ marginTop: "10px" }}>
                    {
                        index === 0 ?
                            <TextField
                                size="small"
                                type="text"
                                fullWidth
                                label={input}
                                variant="outlined"
                                value={index === 0 ? this.state.title : this.state.description}
                                onChange={(e) => this.changeInput(e, index)}
                            />
                            :
                            <TextField
                                size="small"
                                type="text"
                                multiline
                                rows={4}
                                fullWidth
                                label={input}
                                variant="outlined"
                                value={index === 0 ? this.state.title : this.state.description}
                                onChange={(e) => this.changeInput(e, index)}
                            />
                    }
                </Grid>
            );
        });


        return (
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12} sm={6} md={5} style={{ marginTop: "20px" }}>
                    <Paper elevation={3} style={{ padding: "10px" }}>
                        <Typography variant="h4">
                            Main
                        </Typography>
                        {renderedInputs}
                        <Typography variant="subtitle1" style={{ marginTop: 10, color: `red` }}>
                            {this.state.emptyDetailsMessage}
                        </Typography>
                        <Grid item xs={12}>
                            <Button onClick={this.addNote} style={{ margin: "10px 0px" }} variant="contained">Add</Button>
                        </Grid>
                        <Typography>
                            <Link style={{ textDecoration: "none", color: "black" }}
                                to={{
                                    pathname: "/Notes",
                                    state: { notes: this.state.user.notes, email: this.state.user.email}
                                }}>Press here to notes</Link>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        );
    };
};

export default withRouter(CCMain);