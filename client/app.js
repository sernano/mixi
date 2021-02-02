import React from 'react';

import {Navbar} from './components';
import Routes from './routes';
import {Container, Row, Col} from 'react-bootstrap';

const App = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Navbar />
          <Routes />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
