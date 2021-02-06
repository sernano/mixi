import React from 'react';

import {Navbar} from './components';
import Routes from './routes';
import {Container} from 'react-bootstrap';

const App = () => {
  return (
    <div className="h-100 d-flex flex-column">
      <Navbar />
      <Container className="mt-5 mb-1 flex-grow-1">
        <Routes />
      </Container>
      <div className="underlay" />
    </div>
  );
};

export default App;
