import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import {Container, Row, Col, Nav} from 'react-bootstrap';
import MakeTape from './make-tape';
import UploadSongs from './upload-songs';

const Navbar = ({handleClick, isLoggedIn}) => (
  <Container fluid className="navbar-containers">
    <Container className="py-0 navbar-containers">
      <Row className="justify-content-md-between justify-content-center">
        <Col xs={12} md="auto">
          <Link to="/my-tapes">
            <h1 className="text-center mt-2 ml-md-3">Mixi</h1>
          </Link>
        </Col>
        <Col xs="auto">
          {isLoggedIn ? loggedInNavbar({handleClick}) : loggedOutNavbar()}
        </Col>
      </Row>
    </Container>
  </Container>
);

const navClasses =
  'h-100 align-items-center justify-content-end justify-content-md-center';

function loggedInNavbar({handleClick}) {
  // Functions for Make A Tape modal
  const [showMakeTape, setShowMakeTape] = useState(false);
  const closeMakeTape = () => setShowMakeTape(false);
  const openMakeTape = () => setShowMakeTape(true);

  // Functions for Upload Songs modal
  const [showUpload, setShowUpload] = useState(false);
  const closeUpload = () => setShowUpload(false);
  const openUpload = () => setShowUpload(true);

  return (
    <>
      <MakeTape showMakeTape={showMakeTape} closeMakeTape={closeMakeTape} />
      <UploadSongs showUpload={showUpload} closeUpload={closeUpload} />
      <Nav className={navClasses} id="nav-links">
        {/* The navbar will show these links after you log in */}
        <Link to="/my-tapes">My Tapes</Link>
        <a href="#" onClick={openMakeTape}>
          New Tape
        </a>
        <a href="#" onClick={openUpload}>
          Upload Songs
        </a>
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
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
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
