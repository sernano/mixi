import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';
// import 'bootstrap/dist/css/bootstrap.min.css';

// establishes socket connection
import './socket';

import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faPlay,
  faPause,
  faPlusCircle,
  faMinusCircle,
  faFastForward,
  faFastBackward
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faPlay,
  faPause,
  faFastForward,
  faFastBackward,
  faPlusCircle,
  faMinusCircle
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
