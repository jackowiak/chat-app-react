import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Row, Col, FormFeedback, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';

import '../app.css'

export default class Login extends Component {
  render() {
    return (
      <Row className="align-items-center login-row">
        <Col md={{ size: 6, offset: 3 }}>
          {
            (this.props.verified) ?
              <Redirect push to="/chat" />
              :
              <InputGroup>
                <Input
                  invalid={this.props.verified === false}
                  type="text"
                  value={this.props.userName}
                  onChange={this.props.handleUserNameValue}
                  onKeyDown={e => e.key === 'Enter' ? this.props.setUserName() : null}
                />
                <InputGroupAddon addonType="append">
                  <Link to="/chat">
                    <Button color="primary" type="button" onClick={this.props.setUserName}>Enter your name</Button>
                  </Link>
                </InputGroupAddon>
                <FormFeedback>Oh noes! that name is already taken</FormFeedback>
              </InputGroup>
          }
        </Col>
      </Row>
    )
  }
}
