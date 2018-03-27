/* eslint-env browser */
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Input, PrimaryButton, Measure, Label, Text } from '@wa/design-system';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Cookies from 'cookies-js';
import { FriendlyLoader } from '../friendly-loader';
import { Me } from '../me';

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
      }
    }
  }
`;

class CreateSignupForm extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    loading: false,
  };

  authenticateUser = async createAccount => {
    // TODO use proper form validation with formik
    if (!this.state.name || !this.state.email || !this.state.password) return;
    this.setState({ loading: true });
    let response;
    try {
      response = await createAccount({
        variables: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        },
      });
    } catch (error) {
      this.setState({ loading: false });
      return;
    }

    if (response.data && response.data.login && response.data.login.token) {
      Cookies.set('authToken', response.data.login.token);
      // hard refresh so that user is taken into account everywhere
      window.location.href = '/';
    } else {
      // eslint-disable-next-line no-alert
      alert('Failed login:', response.error);
    }
  };

  render() {
    return (
      <Me>
        {({ error, loading, me }) => {
          if (loading) return <FriendlyLoader />;

          if (error) return <Text>Error</Text>;

          // redirect if user is logged in
          if (me && me.id) return <Redirect to="/" />;

          return (
            <Measure>
              <Label htmlFor="signup-name">Name</Label>
              <Input
                id="signup-name"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
              <Label htmlFor="signup-email" mt={2}>
                Email
              </Label>
              <Input
                id="signup-email"
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
              <Label htmlFor="signup-password" mt={2}>
                Password
              </Label>
              <Input
                id="signup-password"
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />

              <Mutation mutation={CREATE_USER_MUTATION}>
                {createAccount => (
                  <PrimaryButton
                    onClick={() => this.authenticateUser(createAccount)}
                    disabled={this.state.loading}
                    mt={2}
                  >
                    Create account
                  </PrimaryButton>
                )}
              </Mutation>
            </Measure>
          );
        }}
      </Me>
    );
  }
}

export const SignupForm = withRouter(CreateSignupForm);
