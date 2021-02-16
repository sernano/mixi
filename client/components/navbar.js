import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {logout} from '../store';
import {Container, Row, Col, Nav, Modal, Form, Button} from 'react-bootstrap';
import {postTape} from '../store/tapes';

const Navbar = ({handleClick, isLoggedIn, postTape, userId}) => (
  <Container fluid className="navbar-containers">
    <Container className="py-0 navbar-containers">
      <Row className="justify-content-md-between justify-content-center">
        <Col xs={12} md="auto">
          <Link to="/my-tapes">
            <h1 className="text-center mt-2 ml-md-3">Mixi</h1>
          </Link>
        </Col>
        <Col xs="auto">
          {isLoggedIn
            ? loggedInNavbar({handleClick, postTape, userId})
            : loggedOutNavbar()}
        </Col>
      </Row>
    </Container>
  </Container>
);

const navClasses =
  'h-100 align-items-center justify-content-end justify-content-md-center';

function loggedInNavbar({handleClick, postTape, userId}) {
  // Gimme history!
  const history = useHistory();

  // Functions for setting form state
  const [tapeForm, setTapeForm] = useState('');
  const handleFormChange = e => setTapeForm(e.target.value);

  // Functions for Make A Tape modal
  const [showMakeTape, setShowMakeTape] = useState(false);
  const closeMakeTape = () => setShowMakeTape(false);
  const openMakeTape = () => setShowMakeTape(true);

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
      userId: userId
    };
    await postTape(tape);
    setTapeForm('');
    history.push('/my-tapes');
    closeMakeTape();
  };

  return (
    <>
      <Modal show={showMakeTape} onHide={closeMakeTape}>
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
          <Button variant="primary" onClick={closeMakeTape}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Nav className={navClasses} id="nav-links">
        {/* The navbar will show these links after you log in */}
        <Link to="/my-tapes">My Tapes</Link>
        <a href="#" onClick={openMakeTape}>
          New Tape
        </a>
        <Link to="/upload-songs">Upload Songs</Link>
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </Nav>
    </>
  );
}

function loggedOutNavbar() {
  return (
    <>
      <Nav className={navClasses} id="nav-links">
        {/* The navbar will show these links before you log in */}
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </Nav>
    </>
  );
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    },
    postTape: tape => dispatch(postTape(tape))
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
