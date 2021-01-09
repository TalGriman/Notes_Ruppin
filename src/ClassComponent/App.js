import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom';
import FCAppbar from '../FunctionalComponent/FCAppbar';
import CCLogin from './CCLogin';
import CCMain from './CCMain';
import CCNotes from './CCNotes';
import CCRegister from './CCRegister';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoggedIn: false
    };
  };

  addUser = (user) => {
    let temp = [...this.state.users, user];
    this.setState({ users: temp });
  };

  isLoggedIn = () => {
    this.setState({ isLoggedIn: true });
  };

  isLoggedOut = () => {
    this.setState({ isLoggedIn: false });

    this.props.history.push({
      pathname: '/'
    });
  };

  render() {

    return (
      <div>
        <FCAppbar isLoggedIn={this.state.isLoggedIn} isLoggedOut={this.isLoggedOut} />
        <Switch>
          <Route exact path="/" render={() => <CCLogin users={this.state.users} isLoggedIn={this.isLoggedIn} />} />
          <Route path="/Register" render={() => <CCRegister addUser={this.addUser} users={this.state.users} />} />
          <Route path="/Main" render={() => <CCMain users={this.state.users} isLoggedIn={this.state.isLoggedIn} />} />
          <Route path="/Notes" render={() => <CCNotes isLoggedIn={this.state.isLoggedIn} users={this.state.users} />} />
        </Switch>
      </div>
    );
  };
}

export default withRouter(App);
