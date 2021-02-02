import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import {Container, Row, Col, Nav} from 'react-bootstrap';

const Navbar = ({handleClick, isLoggedIn}) => (
  <Container>
    <Row>
      <Col md={8}>
        <Link to="/home">
          <h1>Mixi</h1>
        </Link>
      </Col>
      <Col className="justify-content-end">
        {isLoggedIn ? loggedInNavbar(handleClick) : loggedOutNavbar()}
      </Col>
    </Row>
  </Container>
);

function loggedInNavbar(handleClick) {
  return (
    <>
      <Nav className="justify-content-end" id="nav-links">
        {/* The navbar will show these links after you log in */}
        <Link to="/my-tapes">My Tapes</Link>
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
      <Nav className="justify-content-end" id="nav-links">
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
