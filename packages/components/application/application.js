import React from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
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

const Data = graphql(gql`
  query allPosts {
    allPosts {
      id
      title
    }
  }
`)(PlainData);

const PlainMessage = ({ data: { hello, refetch }, loading }) => (
  <div>
    <button onClick={() => refetch()}>Refresh</button>
    <div>{hello ? hello.message : '...'}</div>
  </div>
);

const Message = graphql(gql`
  query aMessage {
    hello(name: "Startup Stack") {
      message
    }
  }
`)(PlainMessage);

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
    </ul>
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
  </div>
);
