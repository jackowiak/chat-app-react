import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import { Message } from './Message';

import '../app.css';
const uuidv4 = require('uuid/v4');

export class Messages extends Component {

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }


  render() {
    return (
      <Row>
        <Col md={{ size: 6, offset: 3 }} className="messages">
          {this.props.messages.map(message => {
            return (
              <Message message={message} key={uuidv4()} />
            )
          })}
          <div style={{ float: "left", clear: "both" }}
            ref={element => { this.messagesEnd = element }}>
          </div>
        </Col>
      </Row>
    )
  }
}
