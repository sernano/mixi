import React from 'react';

const defaultState = {
  tapeName: ''
};

class MakeTape extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Make A Tape</h1>
        <form id="make-a-tape-form" onSubmit={this.handleSubmit}>
          <input
            required
            name="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.tapeName}
            placeholder="tape name"
          />
        </form>
      </div>
    );
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.setState(defaultState);
  }
}
