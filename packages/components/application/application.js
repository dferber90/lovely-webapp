import React from 'react';
import PropTypes from 'prop-types';
import {
  Provider,
  Button,
  Container,
  Toolbar,
  NavItem,
  Flex,
  Box,
} from '@wa/design-system';
import { Route, Switch, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { injectGlobal } from 'styled-components';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; }
`;

class Toggle extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { on: true };
  }
  render() {
    return (
      <Button
        onClick={() => {
          this.setState(prevState => ({ on: !prevState.on }));
        }}
      >
        {this.state.on ? 'on' : 'off'}
      </Button>
    );
  }
}

const PlainData = ({ data: { allPosts, refetch } }) => (
  <div>
    <button onClick={() => refetch()}>Refresh</button>
    <ul>
      {allPosts && allPosts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  </div>
);

PlainData.propTypes = {
  data: PropTypes.shape({
    allPosts: PropTypes.array,
    refetch: PropTypes.func,
  }).isRequired,
};

const Data = graphql(gql`
  query allPosts {
    allPosts {
      id
      title
    }
  }
`)(PlainData);

const PlainMessage = ({ data: { hello, refetch } }) => (
  <div>
    <button onClick={() => refetch()}>Refresh</button>
    <div>{hello ? hello.message : '...'}</div>
  </div>
);

PlainMessage.propTypes = {
  data: PropTypes.shape({
    hello: PropTypes.shape({
      message: PropTypes.string,
    }),
    refetch: PropTypes.func,
  }).isRequired,
};

const Message = graphql(gql`
  query aMessage {
    hello(name: "Startup Stack") {
      message
    }
  }
`)(PlainMessage);

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (SERVER) {
        // eslint-disable-next-line no-param-reassign
        if (staticContext) staticContext.status = code;
      }
      return children;
    }}
  />
);

Status.propTypes = {
  code: PropTypes.number.isRequired,
  children: PropTypes.node,
};

const RedirectWithStatus = ({ from, to, status }) => (
  <Route
    render={({ staticContext }) => {
      // there is no `staticContext` on the client, so
      // we need to guard against that here
      // eslint-disable-next-line no-param-reassign
      if (staticContext) staticContext.status = status;
      return <Redirect from={from} to={to} />;
    }}
  />
);

RedirectWithStatus.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  status: PropTypes.number,
};

const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </Status>
);

export const Application = () => (
  <Provider>
    <Toolbar>
      <NavItem to="/">PoC</NavItem>
      <NavItem ml="auto" to="/a">
        A
      </NavItem>
      <NavItem to="/b">B</NavItem>
      <NavItem to="/data">Data</NavItem>
      <NavItem to="/something-that-does-not-exist">404</NavItem>
      <NavItem to="/redirect-to-home">Redirect</NavItem>
    </Toolbar>
    <Flex>
      <Box px={2} my={2}>
        <Container>
          <Switch>
            <Route path="/" exact render={() => <Toggle />} />
            <Route path="/a" render={() => 'a'} />
            <Route path="/b" render={() => 'b'} />
            <Route
              path="/data"
              render={() => (
                <React.Fragment>
                  <Data />
                  <Message />
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
