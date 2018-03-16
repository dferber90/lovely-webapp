// Usually we'd implement a custom design-system here based
// on styled-system, but as this is a PoC we're using
// the existing rebass which gets many design-system concepts right already
//
// However we need to reconfigure rebass to make it work with react-router
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'rebass';
import { Link } from 'react-router-dom';

export * from 'rebass';

// Implementation from https://github.com/jxnblk/rebass/issues/36
export const NavItem = props => <NavLink {...props} is={Link} />;
NavItem.propTypes = { to: PropTypes.string };
