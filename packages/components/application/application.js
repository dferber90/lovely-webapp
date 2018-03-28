import React from 'react';
import {
  ThemeProvider,
  Container,
  Toolbar,
  NavItem,
  NavLink,
  FooterLink,
  Divider,
  Text,
  Flex,
  Box,
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

const LoadableHome = Loadable({
  loader: () => import('../home'),
  // eslint-disable-next-line react/prop-types
  render: ({ Home }, props) => <Home {...props} />,
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
      <NavItem to="/">Lovely Webapp</NavItem>
      <NavItem ml="auto" to="/tour">
        Tour
      </NavItem>
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
        <Route path="/" exact component={LoadableHome} />
        <Route path="/tour" component={LoadableTour} />
        <Route path="/user" exact component={UserPage} />
        <Route path="/login" exact render={() => <LoginForm to="/" />} />
        <Route path="/signup" exact component={SignupForm} />
        <Route path="/image" component={LoadableImagePage} />
        <Route path="/data" component={Data} />
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
      <Flex>
        <Box mx={[-2, 2, 6]} py={3}>
          <Divider />
          <Text fontSize={12} pt={2} mb={4} align="center">
            <FooterLink href="https://www.dferber.de" target="_blank">
              dferber.de
            </FooterLink>
          </Text>
        </Box>
      </Flex>
    </Container>
  </ThemeProvider>
);
