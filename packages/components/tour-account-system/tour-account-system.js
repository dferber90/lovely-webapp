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
  Link,
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
          Cookie-based user account system that can render authenticated parts
          on the server.
        </Lead>
        <Text py={1}>
          This web app contains an authentication mechanism. Users can sign up,
          login in and log out. Users stay authenticated across sessions using
          cookies.
        </Text>
        <Subhead pt={2} pb={1}>
          Account Creation
        </Subhead>
        <Text py={1}>
          Let&#39;s start by setting up an account for you which you can then
          use to try out the account system.
        </Text>
        <Text py={1}>
          Created accounts are stored in the underyling database. The passwords
          are stored as salted hashes using{' '}
          <Link href="https://www.npmjs.com/package/bcrypt" target="_blank">
            bcrypt
          </Link>.
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
                      You are already signed in. Log out below to see the signup
                      form.
                    </Text>
                  );
                return <SignupForm redirectTo="/tour/account-system" />;
              }}
            </Me>
          </Card>
        </Measure>
        <Text py={1}>
          Feel free to skip this step in case you don&#39;t want to share your
          email address. A public test user account is set up which can be used
          to experiment with this site as well. The login credentials are
          already prefilled in the next step.
        </Text>
        <Subhead pt={4}>Logout</Subhead>
        <Text py={1}>
          You are automatically logged in after signing up. You can now sign out
          again using the logout button below. The client deletes the
          authentication cookie when signing out and does a full page reload.
        </Text>
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
        <Subhead pt={4}>Login</Subhead>
        <Text py={1}>
          Now that you own an account and logged yourself out, it&#39;s time to
          log back in again. When logging in the GraphQL API responds with a
          token which the client then sets as a cookie. Using a cookie ensures
          that server-rendered sites know about the authentication as well.
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
        <Subhead pt={4}>Server-Side Rendering of authenticated parts</Subhead>
        <Text py={1}>
          Try manually reloading this page when logged in or logged out and
          check the differences in the received markup. When logged in
          you&#39;ll notice that the logout button gets rendered by the server,
          otherwise the login form gets rendered. This is proof that the server
          knows about the currently authenticated user.
        </Text>
        <Text py={1}>
          As further proof the box below will contain the string &quot;Hello,
          you are not signed in&quot; while logged out, and &quot;Hello,{' '}
          <i>your name</i>&quot; when signed in. You can reload the page in
          either scenario and search the server-rendered HTML for &quot;Hello,
          &quot; to verify that the server can render authenticated parts.
        </Text>
        <Measure ml={[0, 3]}>
          <Card my={[2, 3]} p={3}>
            <Me>
              {({ loading, error, me }) => {
                if (loading) return <FriendlyLoader />;
                if (error) return <Text>An unknown error occurred</Text>;
                if (me) return <Text>Hello, {me.name}</Text>;
                return <Text>Hello, you are not signed in</Text>;
              }}
            </Me>
          </Card>
        </Measure>
        <Text py={1}>
          Use the login and logout buttons from the examples above to change
          your authentication state.
        </Text>
        <Subhead pt={4}>Summary</Subhead>
        <Text py={1}>
          <ul>
            <li>client and server know about authenticated user</li>
            <li>authentication uses a cookie</li>
          </ul>
        </Text>
      </Layout>
    );
  }
}
