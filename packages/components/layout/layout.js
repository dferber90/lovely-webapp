import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  LocalLink,
  Flex,
  Box,
  Container,
  Divider,
  Text,
  FooterLink,
  NavigationLink,
  Link,
} from '@wa/design-system';
import { ScrollToTop } from '../scroll-to-top';

export class Layout extends React.Component {
  static displayName = 'Layout';
  static propTypes = {
    children: PropTypes.node.isRequired,
    mt: PropTypes.array,
  };
  render() {
    return (
      <React.Fragment>
        <ScrollToTop />
        <Container>
          <Flex
            mx={[-2, 2, 6]}
            mt={this.props.mt}
            pt={2}
            px={[-2, 0, 8]}
            flexDirection="column"
          >
            <Flex alignItems="top" pt={[0, 2]}>
              <Box>
                <LocalLink to="/">
                  <img src="/favicon.png" alt="home" width="32" />
                </LocalLink>
              </Box>
              <Box ml="auto" pt={2} px={[0, 1]}>
                <Route path="/tour">
                  {({ match }) => (
                    <NavigationLink
                      to="/tour"
                      color={match ? undefined : 'grey'}
                    >
                      Tour
                    </NavigationLink>
                  )}
                </Route>
              </Box>
              <Box ml={2} pt={2} px={[0, 1]}>
                <Route path="/recipies">
                  {({ match }) => (
                    <NavigationLink
                      to="/recipies"
                      color={match ? undefined : 'grey'}
                    >
                      Recipies
                    </NavigationLink>
                  )}
                </Route>
              </Box>
              <Box ml={2} pt={2} px={[0, 1]}>
                <Route path="/comparison">
                  {({ match }) => (
                    <NavigationLink
                      to="/comparison"
                      color={match ? undefined : 'grey'}
                    >
                      Comparison
                    </NavigationLink>
                  )}
                </Route>
              </Box>
            </Flex>
            {this.props.children}
          </Flex>
        </Container>
        <Container>
          <Flex>
            <Box mx={[-2, 2, 6]} py={3} mt={5}>
              <Text fontSize={12} pt={2}>
                You can find the complete source code at{' '}
                <Link
                  href="https://github.com/dferber90/wa"
                  target="_blank"
                  color="grey"
                >
                  github.com/dferber90/wa
                </Link>
              </Text>
              <Text fontSize={12} pt={2} mb={4}>
                <FooterLink href="https://www.dferber.de" target="_blank">
                  dferber.de
                </FooterLink>
              </Text>
            </Box>
          </Flex>
        </Container>
      </React.Fragment>
    );
  }
}
