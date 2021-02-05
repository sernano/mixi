import React from 'react';
import {connect} from 'react-redux';
import {postTape} from '../store/tapes';
import {
  Row,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Button
} from 'react-bootstrap';

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
      <Row className="justify-content-center">
        <Col md={9} lg={6}>
          <h2 className="text-center">Make A Tape</h2>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup controlId="tape-name" name="tape-name">
              <FormLabel>Tape Name</FormLabel>
              <FormControl
                type="text"
                name="title"
                placeholder="Enter tape name"
                onChange={this.handleChange}
                value={this.state.title}
                autoComplete="off"
                required
              />
            </FormGroup>
            <div className="text-center text-md-left">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
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
    this.props.history.push('/my-tapes');
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
