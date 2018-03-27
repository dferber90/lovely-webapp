/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Input, PrimaryButton, Measure, Label } from '@wa/design-system';
import { Me } from '../me';

export class LoginForm extends React.Component {
  static propTypes = {
    to: PropTypes.string,
  };
  state = {
    email: 'johndoe@graph.cool',
    password: 'graphql',
  };

  authenticateUser = async () => {
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

      if (response.user) {
        // hard refresh so that user is taken into account everywhere
        if (this.props.to) {
          window.location.href = this.props.to;
        } else {
          window.location.reload();
        }
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
                  <PrimaryButton onClick={this.authenticateUser} mt={2}>
                    Log in
                  </PrimaryButton>
                )}
            </Measure>
          );
        }}
      </Me>
    );
  }
}
