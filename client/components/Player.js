import React from 'react';
import Amplitude from 'amplitude-js';

export class Player extends React.Component {
  componentDidMount() {
    Amplitude.init();
  }
  render() {
    return (
      <div>
        <button type="button">Play</button>
        <button type="button">Stop</button>
      </div>
    );
  }
}
