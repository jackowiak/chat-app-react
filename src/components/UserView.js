import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import { Messages } from './Messages';
import NewMessage from './NewMessage';
import { ActiveUsers } from './ActiveUsers';

import '../app.css';

export default class UserView extends Component {
    render() {
        return (
            <Row className="userview-row align-items-center">
                <Col>
                    <Messages messages={this.props.messages} />
                    <NewMessage addNewMessage={this.props.addNewMessage} userName={this.props.userName} />
                    <ActiveUsers userId={this.props.userId} />
                    <Row>
                        <Col md={{ size: 6, offset: 3 }}>
                            <p className="clearchat" onClick={this.props.resetMessages}>Clear chat</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}