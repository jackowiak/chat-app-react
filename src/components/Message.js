import React from 'react';
import {Row, Col} from 'reactstrap';
import '../app.css';

export const Message = (props) => {
  return (
    <Row>
      <Col className="message">
        <div><span className="username">{props.message.userName}</span> <span className="date">{props.message.date}</span></div>
        <div>{props.message.message}</div>
      </Col>
    </Row>
  )
}
