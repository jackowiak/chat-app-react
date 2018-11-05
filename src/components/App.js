import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Container } from 'reactstrap'

import UserView from './UserView';
import Login from './Login';
import Loader from './Loader';

import { api } from '../API/api';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      userName: "",
      userId: undefined,
      verified: undefined,
      isLoaded: false,
    }

    api.open();
    api.listen(this.handleMessages);
  }

  componentDidMount() {
    api.getUserId((verified, userId) => {
      this.setState({ verified, userId });

      if (this.state.verified) {
        setTimeout(() => {
          this.setState({ isLoaded: true });
        }, 1000);
      }
    });

    api.checkIfUserExists(this.checkStatus);
  }

  checkStatus = () => false;

  addNewMessage = (fullMessage) => {
    api.send(fullMessage);
  }

  handleMessages = (message) => {
    this.setState({ messages: this.state.messages.concat(message) })
  }

  resetMessages = () => {
    this.setState({ messages: [] });
  }

  handleUserNameValue = (e) => {
    this.setState({ userName: e.target.value })
  }

  setUserName = () => {
    api.newActiveUser(this.state.userName);
  }

  render() {
    return (
      <Container>
        <Route path="/chat" render={() => (
          (this.state.verified) ?
            (this.state.isLoaded) ?
              <UserView
                messages={this.state.messages}
                resetMessages={this.resetMessages}
                addNewMessage={this.addNewMessage}
                userName={this.state.userName}
                userId={this.state.userId}
              />
              :
              <Loader />
            :
            <Redirect push to="/" />
        )}
        />

        <Route exact path="/" render={() =>
          <Login
            setUserName={this.setUserName}
            userName={this.state.userName}
            verified={this.state.verified}
            handleUserNameValue={this.handleUserNameValue}
          />}
        />
      </Container>
    )
  }
}

export default App;
