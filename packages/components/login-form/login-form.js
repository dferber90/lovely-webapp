/* eslint-env browser */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Me } from '../me';

export class LoginForm extends React.Component {
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
        window.location.href = '/user';
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
            <div className="w-100 pa4 flex justify-center">
              <div style={{ maxWidth: 400 }} className="">
                <input
                  className="w-100 pa3 mv2"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <input
                  className="w-100 pa3 mv2"
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={e => this.setState({ password: e.target.value })}
                />

                {this.state.email &&
                  this.state.password && (
                    <button
                      className="pa3 bg-black-10 bn dim ttu pointer"
                      onClick={this.authenticateUser}
                    >
                      Log in
                    </button>
                  )}
              </div>
            </div>
          );
        }}
      </Me>
    );
  }
}
