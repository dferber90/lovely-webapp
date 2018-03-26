/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import { Input, Button, Measure, Label, Text } from '@wa/design-system';
import gql from 'graphql-tag';
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
  static propTypes = {
    createUserMutation: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    email: '',
    password: '',
    loading: false,
  };

  authenticateUser = async () => {
    // TODO use proper form validation with formik
    if (!this.state.name || !this.state.email || !this.state.password) return;
    this.setState({ loading: true });
    try {
      await this.props.createUserMutation({
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

    try {
      const response = await fetch(`${process.env.GRAPHQL_ENDPOINT}/login`, {
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
        headers: { 'content-type': 'application/json' },
        method: 'POST',
        // Sends and accepts cookies
        // They won't be sent at all if this is not set
        // It would be better to set this to 'same-origin'
        credentials: 'include',
      }).then(res => res.json());
      this.setState({ loading: false });

      if (response.user) {
        // hard refresh so that user is taken into account everywhere
        window.location.href = '/';
      } else {
        // eslint-disable-next-line no-alert
        alert('Failed login:', response.error);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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

              <Button
                onClick={this.authenticateUser}
                disabled={this.state.loading}
                bg="fuschia"
                mt={2}
              >
                Create account
              </Button>
            </Measure>
          );
        }}
      </Me>
    );
  }
}

export const SignupForm = compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' })
)(withRouter(CreateSignupForm));
