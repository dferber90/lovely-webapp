/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Cookies from 'cookies-js';
import { Formik } from 'formik';
import {
  Input,
  PrimaryButton,
  Measure,
  Label,
  ErrorMessage,
  Divider,
} from '@wa/design-system';
import { Me } from '../me';

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AuthenticateUserMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;

const initialValues = {
  email: 'johndoe@graph.cool',
  password: 'graphql',
};

const validate = values => {
  const errors = {};
  if (values.email.trim().length === 0) errors.email = { missing: true };
  if (values.password.trim().length === 0) errors.password = { missing: true };
  return errors;
};

export class LoginForm extends React.Component {
  static propTypes = {
    to: PropTypes.string,
  };

  authenticateUser = async (login, values, formik) => {
    let response;
    try {
      response = await login({
        variables: { email: values.email, password: values.password },
      });
    } catch (e) {
      if (e.graphQLErrors) {
        if (
          e.graphQLErrors.some(error =>
            error.message.startsWith('Could not find user with email')
          )
        ) {
          formik.setErrors({ email: { unknown: true } });
        }
        if (
          e.graphQLErrors.some(error => error.message === 'Invalid password')
        ) {
          formik.setErrors({ password: { invalid: true } });
        }
      } else {
        formik.setErrors({ unknownError: true });
      }
      return;
    }

    Cookies.set('authToken', response.data.login.token);

    if (this.props.to) {
      window.location.href = this.props.to;
    } else {
      window.location.reload();
    }
  };

  render() {
    return (
      <Me>
        {({ error, loading, me }) => {
          if (loading) {
            return (
              <div className="w-100 pa4 flex justify-center">
                <div>Loading</div>
              </div>
            );
          }
          if (error) {
            return (
              <div className="w-100 pa4 flex justify-center">
                <div>Error</div>
              </div>
            );
          }

          // redirect if user is logged in
          if (me && me.id) return <Redirect to="/" />;

          return (
            <Mutation mutation={AUTHENTICATE_USER_MUTATION}>
              {login => (
                <Formik
                  initialValues={initialValues}
                  validate={validate}
                  onSubmit={(values, formik) =>
                    this.authenticateUser(login, values, formik)
                  }
                  render={formik => (
                    <form onSubmit={formik.handleSubmit}>
                      <Measure>
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          name="email"
                          value={formik.values.email}
                          placeholder="Email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email &&
                          formik.errors.email &&
                          formik.errors.email.missing && (
                            <ErrorMessage>Missing</ErrorMessage>
                          )}
                        {formik.touched.email &&
                          formik.errors.email &&
                          formik.errors.email.unknown && (
                            <ErrorMessage>
                              No account with that email address found
                            </ErrorMessage>
                          )}
                        <Label htmlFor="login-password" mt={2}>
                          Password
                        </Label>
                        <Input
                          id="login-password"
                          name="password"
                          type="password"
                          value={formik.values.password}
                          placeholder="Password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.password &&
                          formik.errors.password &&
                          formik.errors.password.missing && (
                            <ErrorMessage>Missing</ErrorMessage>
                          )}
                        {formik.touched.password &&
                          formik.errors.password &&
                          formik.errors.password.invalid && (
                            <ErrorMessage>
                              Oops, seems like you used an invalid password
                            </ErrorMessage>
                          )}
                        {' '}
                        {formik.errors.unknownError && (
                          <React.Fragment>
                            <Divider />
                            <ErrorMessage mt={2}>
                              An unknown error occurred.
                            </ErrorMessage>
                          </React.Fragment>
                        )}
                        <PrimaryButton type="submit" mt={2}>
                          Log in
                        </PrimaryButton>
                      </Measure>
                    </form>
                  )}
                />
              )}
            </Mutation>
          );
        }}
      </Me>
    );
  }
}
