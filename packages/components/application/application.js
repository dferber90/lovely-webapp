import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const Button = styled.button`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;

  &:hover {
    background: #ccbfaa;
  }
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
    hello: PropTypes.string,
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
  <div>
    Hello there
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/a">A</Link>
      </li>
      <li>
        <Link to="/b">B</Link>
      </li>
      <li>
        <Link to="/data">Data</Link>
      </li>
      <li>
        <Link to="/something-that-does-not-exist">
          Something that does not exist
        </Link>
      </li>
      <li>
        <Link to="/redirect-to-home">Redirect to home</Link>
      </li>
    </ul>
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
  </div>
);
