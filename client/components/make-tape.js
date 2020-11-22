import React from 'react';
import {connect} from 'react-redux';
import {postTape} from '../store/tapes';

const defaultState = {
  title: ''
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
            name="title"
            type="text"
            onChange={this.handleChange}
            value={this.state.title}
            placeholder="tape name"
          />
          <button type="submit">Submit</button>
        </form>
        <br />
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
    const tape = {
      title: this.state.title,
      slug: this.state.title
        .split('')
        .map(char => {
          if (char === ' ') {
            return '-';
          } else {
            return char.toLowerCase();
          }
        })
        .join(''),
      isPublic: true,
      userId: this.props.userId
    };
    this.props.postTape(tape);
    this.setState(defaultState);
  }
}

const mapState = state => {
  return {
    tapes: state.tapes,
    userId: state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    postTape: tape => dispatch(postTape(tape))
  };
};

export default connect(mapState, mapDispatch)(MakeTape);
