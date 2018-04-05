import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Breadcrumbs,
  LocalLink,
  Text,
  Subhead,
  Card,
  Measure,
  Box,
  Heading,
  Lead,
  PrimaryButton,
} from '@wa/design-system';
import { Layout } from '../layout';
import { LoginForm } from '../login-form';
import { SignupForm } from '../signup-form';
import { Me } from '../me';
import { FriendlyLoader } from '../friendly-loader';
import { Logout } from '../logout';

export class TourAccountSystem extends React.Component {
  static displayName = 'TourAccountSystem';
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Account System of Lovely Webapp</title>
        </Helmet>
        <Heading.h2 pt={[0, 3]} mt={[2, 3]}>
          Account System
        </Heading.h2>
        <Box pt={1} pb={2}>
          <Breadcrumbs>
            <LocalLink to="/">Lovely Webapp</LocalLink>
            <LocalLink to="/tour">Tour</LocalLink>
            <Text>Account System</Text>
          </Breadcrumbs>
        </Box>
        <Lead pt={2} pb={2}>
          Cookie-based user system that can render authenticated parts on the
          server.
        </Lead>
        <Subhead pt={2} pb={1}>
          Account Creation
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
                      You are already signed in. Sign out to try out the login
                      form.
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
      </Layout>
    );
  }
}
