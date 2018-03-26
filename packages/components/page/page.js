import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Lead, Flex, Box } from '@wa/design-system';

export class Page extends React.Component {
  static displayName = 'Page';
  static propTypes = {
    heading: PropTypes.string.isRequired,
    lead: PropTypes.string.isRequired,
    children: PropTypes.node,
  };
  render() {
    return (
      <React.Fragment>
        <Flex>
          <Box mx={2} px={10} py={1}>
            <Heading>{this.props.heading}</Heading>
          </Box>
        </Flex>
        <Flex>
          <Box mx={2} px={10} py={0}>
            <Lead>{this.props.lead}</Lead>
          </Box>
        </Flex>
        <Flex>
          <Box mx={2} px={10} py={3}>
            {this.props.children}
          </Box>
        </Flex>
      </React.Fragment>
    );
  }
}
