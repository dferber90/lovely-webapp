import React from 'react';
import {
  ThemeProvider,
  Container,
  Toolbar,
  NavItem,
  NavLink,
  Link,
  Divider,
  Text,
} from '@wa/design-system';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import Loadable from 'react-loadable';
import { Data } from '../data';
import { LoginForm } from '../login-form';
import { SignupForm } from '../signup-form';
import { Loading } from '../loading';
import { UserPage } from '../user-page';
import { RedirectWithStatus, NotFound } from '../route-helpers';
import { FriendlyLoader } from '../friendly-loader';
import { Me } from '../me';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; }
`;

const LoadableTour = Loadable({
  loader: () => import('../tour'),
  // eslint-disable-next-line react/prop-types
  render: ({ Tour }, props) => <Tour {...props} />,
  loading: Loading,
});

const LoadableToggle = Loadable({
  loader: () => import('../toggle'),
  // eslint-disable-next-line react/prop-types
  render: ({ Toggle }, props) => <Toggle {...props} />,
  loading: Loading,
});

const LoadableImagePage = Loadable({
  loader: () => import('../image-page'),
  // eslint-disable-next-line react/prop-types
  render: ({ ImagePage }, props) => <ImagePage {...props} />,
  loading: Loading,
});

export const Application = () => (
  <ThemeProvider>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Webapp</title>
      <link rel="shortcut icon" href="/favicon.png" />
    </Helmet>
    <Toolbar bg="fuschia" mb={2}>
      <NavItem to="/">PoC</NavItem>
      <NavItem ml="auto" to="/a">
        A
      </NavItem>
      <NavItem to="/tour">Tour</NavItem>
      <NavItem to="/user">User</NavItem>
      <NavItem to="/protected">Protected</NavItem>
      <NavItem to="/image">Image</NavItem>
      <NavItem to="/data">Data</NavItem>
      <NavItem to="/something-that-does-not-exist">404</NavItem>
      <NavItem to="/redirect-to-home">Redirect</NavItem>
      <NavLink href="/server-side">Server Side</NavLink>
    </Toolbar>
    <Container>
      <Switch>
        <Route path="/" exact render={() => <LoadableToggle />} />
        <Route path="/tour" render={() => <LoadableTour />} />
        <Route path="/user" exact render={() => <UserPage />} />
        <Route path="/login" exact render={() => <LoginForm to="/" />} />
        <Route path="/signup" exact render={() => <SignupForm />} />
        <Route path="/a" render={() => 'a'} />
        <Route path="/image" render={() => <LoadableImagePage />} />
        <Route
          path="/data"
          render={() => (
            <React.Fragment>
              <Data />
            </React.Fragment>
          )}
        />
        <Route
          path="/protected"
          render={() => (
            <Me>
              {({ loading, error, me }) => {
                if (error || loading) return <FriendlyLoader error={error} />;
                if (!me) return 'No Access';
                return 'Welcome to protected route';
              }}
            </Me>
          )}
        />
        <RedirectWithStatus status={302} from="/redirect-to-home" to="/" />
        <Route component={NotFound} />
      </Switch>
    </Container>
    <Container>
      <Divider />
      <Text fontSize={12} pt={2} mb={4} align="center">
        <Link href="https://www.dferber.de" target="_blank">
          dferber.de
        </Link>
      </Text>
    </Container>
  </ThemeProvider>
);
