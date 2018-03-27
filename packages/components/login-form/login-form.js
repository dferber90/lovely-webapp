/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Cookies from 'cookies-js';
import { Input, PrimaryButton, Measure, Label } from '@wa/design-system';
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

export class LoginForm extends React.Component {
  static propTypes = {
    to: PropTypes.string,
  };
  state = {
    email: 'johndoe@graph.cool',
    password: 'graphql',
  };

  authenticateUser = async login => {
    let response;
    try {
      response = await login({
        variables: {
          email: this.state.email,
          password: this.state.password,
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Invalid credentials');
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
            <Measure>
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                value={this.state.email}
                placeholder="Email"
                onChange={e => this.setState({ email: e.target.value })}
              />
              <Label htmlFor="login-password" mt={2}>
                Password
              </Label>
              <Input
                id="login-password"
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={e => this.setState({ password: e.target.value })}
              />
              {this.state.email &&
                this.state.password && (
                  <Mutation mutation={AUTHENTICATE_USER_MUTATION}>
                    {login => (
                      <PrimaryButton
                        onClick={() => this.authenticateUser(login)}
                        mt={2}
                      >
                        Log in
                      </PrimaryButton>
                    )}
                  </Mutation>
                )}
            </Measure>
          );
        }}
      </Me>
    );
  }
}
