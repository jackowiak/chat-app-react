import React from 'react';

import { Row, Col } from 'reactstrap';

import '../app.css';

const Loader = () => {
    return (
      <Row className="loader-row align-items-center">
        <Col md={{ size: 6, offset: 3 }} className="lds-dual-ring"></Col>
      </Row>
    )
}

export default Loader;
