/* eslint-env browser */
/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Lead, Flex, Box, LocalLink } from '@wa/design-system';
import { ScrollToTop } from '../scroll-to-top';

export class Page extends React.Component {
  static displayName = 'Page';
  static propTypes = {
    breadcrumbs: PropTypes.node,
    heading: PropTypes.string.isRequired,
    lead: PropTypes.string.isRequired,
    children: PropTypes.node,
  };
  render() {
    return (
      <React.Fragment>
        <ScrollToTop />
        <Flex>
          <Box mx={[-2, 2, 6]} px={[-2, 0, 8]} pt={[0, 2]} mt={[3, 5]}>
            <LocalLink to="/">
              <img src="/favicon.png" alt="home" width="32" />
            </LocalLink>
          </Box>
        </Flex>
        <Flex>
          <Box mx={[-2, 2, 6]} px={[-2, 0, 8]} pt={[0, 2]} mt={2}>
            <Heading>{this.props.heading}</Heading>
          </Box>
        </Flex>
        <Flex>
          <Box mx={[-2, 2, 6]} px={[-2, 0, 8]} pt={2} pb={2}>
            <Lead>{this.props.lead}</Lead>
          </Box>
        </Flex>
        {this.props.breadcrumbs && (
          <Flex>
            <Box mx={[-2, 2, 6]} px={[-2, 0, 8]} pb={2}>
              {this.props.breadcrumbs}
            </Box>
          </Flex>
        )}
        <Flex>
          <Box mx={[-2, 2, 6]} px={[-2, 0, 8]} py={3}>
            {this.props.children}
          </Box>
        </Flex>
      </React.Fragment>
    );
  }
}
