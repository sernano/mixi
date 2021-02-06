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
    <Row className="justify-content-center">
      <Col md={9} lg={6}>
        <h2 className="text-center">{displayName}</h2>
        <Form onSubmit={handleSubmit} name={name}>
          <FormGroup controlId="email" name="email">
            <FormLabel>Email address</FormLabel>
            <FormControl type="email" placeholder="Enter email" required />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </FormGroup>
          <div className="text-center text-md-left align-items-center d-flex">
            <Button variant="primary" type="submit">
              {displayName}
            </Button>
            {error &&
              error.response && (
                <div className="d-inline-block m-0 ml-4">
                  {' '}
                  <h6 className="text-danger mb-0">
                    {error.response.data}
                  </h6>{' '}
                </div>
              )}
          </div>
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
