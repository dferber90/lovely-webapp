import React from 'react';
import {
  Provider,
  Container,
  Toolbar,
  NavItem,
  NavLink,
  Flex,
  Box,
} from '@wa/design-system';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import Loadable from 'react-loadable';
import { Data } from '../data';
import { LoginForm } from '../login-form';
import { Loading } from '../loading';
import { UserPage } from '../user-page';
import { RedirectWithStatus, NotFound } from '../route-helpers';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; }
`;

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
  <Provider>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Webapp</title>
      <link rel="shortcut icon" href="/favicon.png" />
    </Helmet>
    <Toolbar>
      <NavItem to="/">PoC</NavItem>
      <NavItem ml="auto" to="/a">
        A
      </NavItem>
      <NavItem to="/user">User</NavItem>
      <NavItem to="/image">Image</NavItem>
      <NavItem to="/data">Data</NavItem>
      <NavItem to="/something-that-does-not-exist">404</NavItem>
      <NavItem to="/redirect-to-home">Redirect</NavItem>
      <NavLink href="/server-side">Server Side</NavLink>
    </Toolbar>
    <Flex>
      <Box px={2} my={2}>
        <Container>
          <Switch>
            <Route path="/" exact render={() => <LoadableToggle />} />
            <Route path="/user" exact render={() => <UserPage />} />
            <Route path="/login" exact render={() => <LoginForm />} />
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
            <RedirectWithStatus status={302} from="/redirect-to-home" to="/" />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Box>
    </Flex>
  </Provider>
);
