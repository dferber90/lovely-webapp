import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from '../loading';

export class FriendlyLoader extends React.Component {
  static displayName = 'FriendlyLoader';
  static propTypes = {
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    timeout: PropTypes.number,
    delay: PropTypes.number,
  };
  static defaultProps = {
    delay: 200,
    timeout: 5000,
  };
  state = {
    pastDelay: false,
    timedOut: false,
  };
  componentDidMount() {
    this.delayTimer = setTimeout(
      () => this.setState({ pastDelay: true }),
      this.props.delay
    );

    this.timeoutTimer = setTimeout(
      () => this.setState({ timedOut: true }),
      this.props.timeout
    );
  }
  componentWillUnmount() {
    clearTimeout(this.delayTimer);
    this.delayTimer = null;

    clearTimeout(this.timeoutTimer);
    this.timeoutTimer = null;
  }
  timeoutTimer = null;
  delayTimer = null;
  render() {
    return (
      <Loading
        error={this.props.error}
        pastDelay={this.state.pastDelay}
        timedOut={this.state.timedOut}
      />
    );
  }
}
