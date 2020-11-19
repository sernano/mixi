import React from 'react';
import Amplitude from 'amplitudejs';

export default class Player extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <button type="button">Play</button>
        <button type="button">Stop</button>
      </div>
    );
  }
}
