import React, { Component } from 'react';

import { Button, Input, InputGroup, InputGroupAddon, Row, Col } from 'reactstrap';

export default class NewMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };
  }

  updateMessage = (e) => {
    this.setState({
      message: e.target.value
    });
  }

  sendMessage = () => {
    if (this.state.message !== "") {
      this.props.addNewMessage({
        message: this.state.message,
        userName: this.props.userName,
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      this.setState({
        message: ""
      })
    }
  }

  render() {
    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <InputGroup>
            <Input
              value={this.state.message}
              onChange={this.updateMessage}
              placeholder="Enter a message..."
              onKeyPress={e => (e.key === 'Enter') ? (this.sendMessage()) : null}
            />
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={this.sendMessage}>Send a message</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    )
  }
}
