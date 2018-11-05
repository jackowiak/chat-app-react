import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';

import { api } from '../API/api';

export class ActiveUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersList: []
    }
  }

  componentDidMount() {
    api.getUsersList();
    api.showUsersList(usersList => { this.setState({ usersList }) });

    window.onbeforeunload = () => {
      api.close(this.props.userId);
    }
  }

  showUsersName = () => {
    let arr = [];

    this.state.usersList.map(user => {
      return arr.push(user.userName)
    });

    return arr.join(", ");
  }

  render() {
    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <p className="activeusers">Active users: {this.state.usersList && this.showUsersName()}</p>
        </Col>
      </Row>
    )
  }
}
