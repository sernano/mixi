import React from 'react';

import {Navbar} from './components';
import Routes from './routes';
import {Container} from 'react-bootstrap';

const App = () => {
  return (
    <div>
      <Navbar />
      <Container>
        <Routes />
      </Container>
    </div>
  );
};

export default App;
