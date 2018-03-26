import React from 'react';
import PropTypes from 'prop-types';
import { Heading, Lead, Flex, Box } from '@wa/design-system';

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
        <Flex>
          <Box mx={[-2, 0, 4]} px={[-2, 0, 8]} pt={[0, 2]}>
            <Heading>{this.props.heading}</Heading>
          </Box>
        </Flex>
        <Flex>
          <Box mx={[-2, 0, 4]} px={[-2, 0, 8]} pt={0} pb={2}>
            <Lead>{this.props.lead}</Lead>
          </Box>
        </Flex>
        {this.props.breadcrumbs && (
          <Flex>
            <Box mx={[-2, 0, 4]} px={[-2, 0, 8]} pb={2}>
              {this.props.breadcrumbs}
            </Box>
          </Flex>
        )}
        <Flex>
          <Box mx={[-2, 0, 4]} px={[-2, 0, 8]} py={3}>
            {this.props.children}
          </Box>
        </Flex>
      </React.Fragment>
    );
  }
}
