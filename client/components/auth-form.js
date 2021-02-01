import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth} from '../store';
import {
  Row,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Button
} from 'react-bootstrap';

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props;

  return (
    <Row className="login-signup">
      <Col>
        <h2>{displayName}</h2>
        <Form onSubmit={handleSubmit} name={name} className="login-form">
          <FormGroup controlId="login">
            <FormLabel>Email address</FormLabel>
            <FormControl type="email" placeholder="Enter email" required />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl type="password" placeholder="Password" required />
          </FormGroup>
          <div>
            <Button variant="primary" type="submit">
              {displayName}
            </Button>
          </div>
          {error &&
            error.response && (
              <div>
                {' '}
                <h4>{error.response.data}</h4>{' '}
              </div>
            )}
        </Form>
      </Col>
    </Row>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
