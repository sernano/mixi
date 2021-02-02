import React from 'react';

import {Navbar} from './components';
import Routes from './routes';
import {Container} from 'react-bootstrap';

const App = () => {
  return (
    <Container>
      <Navbar />
      <Routes />
    </Container>
  );
};

export default App;
