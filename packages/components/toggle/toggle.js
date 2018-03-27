import React from 'react';
import { PrimaryButton } from '@wa/design-system';

export class Toggle extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { on: true };
  }
  render() {
    return (
      <PrimaryButton
        onClick={() => {
          this.setState(prevState => ({ on: !prevState.on }));
        }}
      >
        {this.state.on ? 'on' : 'off'}
      </PrimaryButton>
    );
  }
}
