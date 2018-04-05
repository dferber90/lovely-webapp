/* eslint-env browser */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class CreateScrollToTop extends React.Component {
  static propTypes = {
    location: PropTypes.any,
  };
  componentDidMount() {
    // disabled to avoid scrolling to top during hot module replacement
    if (!DEV) window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) window.scrollTo(0, 0);
  }
  render() {
    return null;
  }
}

export const ScrollToTop = withRouter(CreateScrollToTop);
