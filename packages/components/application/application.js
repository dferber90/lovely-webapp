import React from 'react';

class Toggle extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { on: true };
  }
  render() {
    return (
      <button
        onClick={() => {
          this.setState(prevState => ({ on: !prevState.on }));
        }}
      >
        {this.state.on ? 'on' : 'off'}
      </button>
    );
  }
}

export const Application = () => (
  <div>
    Hello there
    <Toggle />
  </div>
);
