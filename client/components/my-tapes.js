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
      <div>
        {this.props.tapes.map((tape, idx) => {
          return <div key={idx}>{tape.title}</div>;
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
