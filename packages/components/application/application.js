import React from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';

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
    </ul>
    <Route path="/" exact render={() => <Toggle />} />
    <Route path="/a" render={() => 'a'} />
    <Route path="/b" render={() => 'b'} />
  </div>
);
