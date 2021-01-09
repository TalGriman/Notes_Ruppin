import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Paper, IconButton, Typography, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


class CCNotes extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    };

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            this.props.history.push({
                pathname: '/'
            })
        }
        let user = this.props.users.find((user) => user.email === this.props.location.state.email);
        this.setState({ user: user });
    }


    delNote = (index) => {
        this.state.user.deleteNote(index);
        this.setState({ user: this.state.user })
    };


    render() {
        return (
            this.props.isLoggedIn && this.state.user !== undefined ?
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        <Typography variant="h4">
                            Notes
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        {
                            this.state.user.notes.map((note, index) =>
                                <Grid key={index} item xs={12} sm={12} md={12} style={{ marginTop: "20px" }}>
                                    <Paper elevation={3} style={{ padding: "10px", textAlign: "center" }}>
                                        <Typography variant="subtitle1" style={{ marginBottom: "5px", wordWrap: "break-word" }}>
                                            <Box fontWeight="fontWeightMedium">
                                                {note.title}
                                            </Box>
                                        </Typography>
                                        <Typography variant="body2" style={{ wordWrap: "break-word" }}>
                                            {note.description}
                                        </Typography>
                                        <IconButton
                                            onClick={() => this.delNote(index)}
                                            aria-label="delete"
                                            color="secondary"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Paper>
                                </Grid>
                            )
                        }
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px" }}>
                        <Typography>
                            <Link style={{ textDecoration: "none", color: "black" }}
                                to={{
                                    pathname: "/Main",
                                    state: { email: this.props.location.state.email }
                                }}>Press here to main</Link>
                        </Typography>
                    </Grid>

                </Grid> : null
        );
    };
};

export default withRouter(CCNotes);