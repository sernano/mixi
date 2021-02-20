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
      <Modal
        show={props.showMakeTape}
        onHide={props.closeMakeTape}
        className="modal"
      >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title>Make a Tape</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTapeSubmit} className="mt-2">
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
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="mt-3 mb-3">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
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
