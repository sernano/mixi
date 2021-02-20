import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {postTape} from '../store/tapes';
import {Modal, Form, Button} from 'react-bootstrap';

const MakeTape = props => {
  const history = useHistory();

  // Functions for setting form state
  const [tapeForm, setTapeForm] = useState('');
  const handleFormChange = e => setTapeForm(e.target.value);

  // Function for submitting Make A Tape form
  const handleTapeSubmit = async e => {
    e.preventDefault();
    const tape = {
      title: tapeForm,
      slug: tapeForm
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
      userId: props.userId
    };
    await props.postTape(tape);
    setTapeForm('');
    history.push('/my-tapes');
    props.closeMakeTape();
  };

  return (
    <>
      <Modal show={props.showMakeTape} onHide={props.closeMakeTape}>
        <Modal.Header closeButton>
          <Modal.Title>Make a Tape</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTapeSubmit}>
            <Form.Group controlId="tape-name" name="tape-name">
              <Form.Label>Tape Name</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter tape name"
                onChange={handleFormChange}
                value={tapeForm}
                autoComplete="off"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.closeMakeTape}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapState = state => {
  return {
    userId: state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    postTape: tape => dispatch(postTape(tape))
  };
};

export default connect(mapState, mapDispatch)(MakeTape);
