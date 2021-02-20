import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchTapes} from '../store/tapes';
import {Row, Col, Image} from 'react-bootstrap';

class MyTapes extends React.Component {
  componentDidMount() {
    this.props.fetchTapes(this.props.userId);
  }

  render() {
    return (
      <Col>
        <h2 className="mb-4 ml-4 text-center text-md-left">My Tapes</h2>
        <Row>
          {this.props.tapes.map(tape => {
            return (
              <Col key={tape.id} md={3} sm={6} className="text-center">
                <Image
                  src={tape.albumArtUrl}
                  onClick={() => this.handleClick(tape.id)}
                  className="img-thumbnail album-art"
                />
                <h6 className="mt-2">{tape.title}</h6>
              </Col>
            );
          })}
        </Row>
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
