import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchTapes} from '../store/tapes';

class MyTapes extends React.Component {
  componentDidMount() {
    this.props.fetchTapes(this.props.userId);
  }
  render() {
    return (
      <div id="tapes">
        <h2>My Tapes</h2>
        {this.props.tapes.map((tape, idx) => {
          return (
            <div key={idx}>
              <h3>{tape.title}</h3>
            </div>
          );
        })}
        <Link to="/make-tape">Make a new tape</Link>
      </div>
    );
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    tapes: state.tapes.tapes
  };
};

const mapDispatch = dispatch => {
  return {
    fetchTapes: userId => dispatch(fetchTapes(userId))
  };
};

export default connect(mapState, mapDispatch)(MyTapes);
