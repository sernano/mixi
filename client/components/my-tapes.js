import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchTapes} from '../store/tapes';
import {Col, Image} from 'react-bootstrap';

class MyTapes extends React.Component {
  componentDidMount() {
    this.props.fetchTapes(this.props.userId);
  }
  render() {
    return (
      <Col className="align-items-md-start align-items-center col d-flex flex-column">
        <h2 className="mb-4">My Tapes</h2>
        {this.props.tapes.map(tape => {
          return (
            <div key={tape.id}>
              <Image
                src={tape.albumArtUrl}
                onClick={() => this.handleClick(tape.id)}
                className="img-thumbnail album-art"
              />
              <h6 className="my-0">{tape.title}</h6>
            </div>
          );
        })}
        <Link to="/make-tape">
          <h6 className="text-center">Make a new tape</h6>
        </Link>
      </Col>
    );
  }

  handleClick(tapeId) {
    this.props.history.push(`/edit-tape/${tapeId}`);
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    tapes: state.tapes
  };
};

const mapDispatch = dispatch => {
  return {
    fetchTapes: userId => dispatch(fetchTapes(userId))
  };
};

export default connect(mapState, mapDispatch)(MyTapes);
