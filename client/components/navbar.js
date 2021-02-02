import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../store';
import {Container, Row, Col} from 'react-bootstrap';

const Navbar = ({handleClick, isLoggedIn}) => (
  <Container>
    <Row>
      <Link to="/home">
        <h1>Mixi</h1>
      </Link>
      <nav>
        {isLoggedIn ? loggedInNavbar(handleClick) : loggedOutNavbar()}
        <div />
      </nav>
    </Row>
  </Container>
);

function loggedInNavbar(handleClick) {
  return (
    <Col>
      {/* The navbar will show these links after you log in */}
      <Link to="/my-tapes">My Tapes</Link>
      <Link to="/upload-songs">Upload Songs</Link>
      <a href="#" onClick={handleClick}>
        Logout
      </a>
    </Col>
  );
}

function loggedOutNavbar() {
  return (
    <>
      <Col>
        {/* The navbar will show these links before you log in */}
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </Col>
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
