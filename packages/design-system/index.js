// Usually we'd implement a custom design-system here based
// on styled-system, but as this is a PoC we're using
// the existing rebass which gets many design-system concepts right already
//
// However we need to reconfigure rebass to make it work with react-router
import React from 'react';
import PropTypes from 'prop-types';
import { Provider, NavLink, Flex, Box, Text, Button } from 'rebass';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import sys from 'system-components';

export * from 'rebass';

// Implementation from https://github.com/jxnblk/rebass/issues/36
export const NavItem = props => <NavLink {...props} is={Link} />;
NavItem.propTypes = { to: PropTypes.string };

// implement from https://github.com/jxnblk/rebass/blob/master/src/Link.js
export const LocalLink = sys(
  {
    is: Link,
    color: 'fuschia',
  },
  'space'
);

export const FooterLink = styled.a`
  text-decoration: none;
  color: #aaa;
  &:hover {
    text-decoration: underline;
  }
`;

export const PrimaryButton = styled(Button)``;
PrimaryButton.defaultProps = {
  bg: 'fuschia',
};

export const Breadcrumbs = ({ children }) => (
  <Flex fontSize={12}>
    {React.Children.map(children, (child, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <React.Fragment key={index}>
        {index !== 0 && (
          <Box mx={1}>
            <Text color="grey">/</Text>
          </Box>
        )}
        <Box>{child}</Box>
      </React.Fragment>
    ))}
  </Flex>
);
Breadcrumbs.propTypes = {
  children: PropTypes.node.isRequired,
};

export const BreadcrumbLink = LocalLink.extend`
  text-decoration: none;
`;

export const ThemeProvider = props => (
  <Provider
    {...props}
    theme={{
      fonts: {
        sans: '"Avenir Next", Helvetica, sans-serif',
        mono: 'Menlo, monospace',
      },
    }}
  />
);

export const ErrorMessage = styled(Text)``;
ErrorMessage.defaultProps = {
  color: 'red',
  fontSize: 12,
  m: 1,
};

export const SuccessMessage = styled(Text)``;
SuccessMessage.defaultProps = {
  color: 'green',
  fontSize: 12,
  m: 1,
};

LocalLink.displayName = 'LocalLink';
