import React from 'react';
import { Text, Subhead, PrimaryButton, Measure, Card } from '@wa/design-system';
import { SignupForm } from '../signup-form';
import { LoginForm } from '../login-form';
import { Me } from '../me';
import { FriendlyLoader } from '../friendly-loader';
import { Logout } from '../logout';

export const TourSectionAccountSystem = () => (
  <React.Fragment>
    <Subhead pt={2} pb={1}>
      1.1 Account Creation
    </Subhead>
    <Text py={1}>
      This web app contains an authentication mechanism. Users can sign up,
      login in and log out. Users stay authenticated across sessions.
    </Text>
    <Measure ml={[0, 3]}>
      <Card my={[2, 3]} p={3}>
        <Me>
          {({ loading, error, me }) => {
            if (loading) return <FriendlyLoader />;
            if (error) return <Text>An unknown error occurred</Text>;
            if (me)
              return (
                <Text>
                  You are already signed in. Sign out to try out the signup
                  form.
                </Text>
              );
            return <SignupForm />;
          }}
        </Me>
      </Card>
    </Measure>
    <Text py={1}>As you can see this was quite easy.</Text>
    <Subhead pt={4}>Login</Subhead>
    <Text py={1}>
      Once you created an account above, you can log in from here.
    </Text>
    <Measure ml={[0, 3]}>
      <Card my={[2, 3]} p={3}>
        <Me>
          {({ loading, error, me }) => {
            if (loading) return <FriendlyLoader />;
            if (error) return <Text>An unknown error occurred</Text>;
            if (me)
              return (
                <Text>
                  You are already signed in. Sign out to try out the login form.
                </Text>
              );
            return <LoginForm to="/tour/account-system" />;
          }}
        </Me>
      </Card>
    </Measure>
    <Subhead pt={4}>Logout</Subhead>
    <Text py={1}>When a user logs out, the server deletes the cookie.</Text>
    <Measure ml={[0, 3]}>
      <Card my={[2, 3]} p={3}>
        <Me>
          {({ loading, error, me }) => {
            if (loading) return <FriendlyLoader />;
            if (error) return <Text>An unknown error occurred</Text>;
            if (!me)
              return (
                <Text>
                  You are already logged out. Log in to try out the logout
                  button.
                </Text>
              );
            return (
              <Logout>
                {logoutBag => (
                  <PrimaryButton
                    disabled={logoutBag.loading}
                    onClick={logoutBag.logout}
                  >
                    Logout
                  </PrimaryButton>
                )}
              </Logout>
            );
          }}
        </Me>
      </Card>
    </Measure>
  </React.Fragment>
);
