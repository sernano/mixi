import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchTapes} from '../store/tapes';
import {Col, ListGroup, ListGroupItem} from 'react-bootstrap';

class MyTapes extends React.Component {
  componentDidMount() {
    this.props.fetchTapes(this.props.userId);
  }
  render() {
    return (
      <Col>
        <h2>My Tapes</h2>
        <ListGroup>
          {this.props.tapes.map(tape => {
            return (
              <ListGroupItem
                key={tape.id}
                onClick={() => this.handleClick(tape.id)}
                action
              >
                <h6 className="my-0">{tape.title}</h6>
              </ListGroupItem>
            );
          })}
        </ListGroup>
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
    tapes: state.tapes.tapes
  };
};

const mapDispatch = dispatch => {
  return {
    fetchTapes: userId => dispatch(fetchTapes(userId))
  };
};

export default connect(mapState, mapDispatch)(MyTapes);
