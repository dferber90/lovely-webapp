/* eslint-disable react/no-multi-comp */
import React from 'react';
import { LocalLink, Tabs, Tab, Measure, Container } from '@wa/design-system';
import { Me } from '../me';
import { FriendlyLoader } from '../friendly-loader';
import { LoginForm } from '../login-form';
import { SignupForm } from '../signup-form';
import { Logout } from '../logout';

class LogoutButton extends React.Component {
  static displayName = 'LogoutButton';
  render() {
    return (
      <Logout to="/user">
        {({ loading, logout }) => (
          <button
            className="dib bg-red white pa3 pointer dim"
            disabled={loading}
            onClick={logout}
          >
            Logout
          </button>
        )}
      </Logout>
    );
  }
}

export class UserPage extends React.Component {
  state = {
    tab: 'login',
  };
  render() {
    return (
      <div>
        <Me>
          {({ loading, me }) => {
            if (loading) return <FriendlyLoader />;

            const isLoggedIn = me && me.id !== null;

            if (isLoggedIn)
              return (
                <div>
                  <span>User: {me.name}</span>
                  <div className="pv3">
                    <LogoutButton />
                  </div>
                </div>
              );

            return (
              <Measure>
                <Tabs mb={2}>
                  <Tab
                    onClick={() => this.setState({ tab: 'login' })}
                    borderColor={
                      this.state.tab === 'login' ? 'fuschia' : undefined
                    }
                  >
                    Login
                  </Tab>
                  <Tab
                    onClick={() => this.setState({ tab: 'signup' })}
                    borderColor={
                      this.state.tab === 'signup' ? 'fuschia' : undefined
                    }
                  >
                    Create account
                  </Tab>
                </Tabs>
                {this.state.tab === 'login' && <LoginForm to="/user" />}
                {this.state.tab === 'signup' && <SignupForm to="/user" />}
              </Measure>
            );
          }}
        </Me>
      </div>
    );
  }
}
