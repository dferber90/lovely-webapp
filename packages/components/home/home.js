/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Text,
  Heading,
  Subhead,
  PrimaryButton,
  LocalLink,
  Lead,
  Box,
} from '@wa/design-system';
import { Layout } from '../layout';

export class Home extends React.Component {
  render() {
    return (
      <Layout mt={[3, 5]}>
        <Helmet>
          <title>Lovely Webapp</title>
        </Helmet>
        <Box py={[0, 2]}>
          <Heading.h1 fontSize={6}>Lovely Webapp</Heading.h1>
        </Box>
        <Box pt={2} pb={2}>
          <Lead>
            This site is built to show off how the latest web technologies can
            be combined to create the foundation of a solid, server-rendered web
            application with client-side takeover.
          </Lead>
        </Box>
        <Box py={3}>
          <Subhead pt={2} pb={1}>
            What makes this site so lovely?
          </Subhead>
          <Text py={1}>
            This foundation enables incredible fast page loads, while still
            offering the tools to build an interactive site. It combines the
            best of both worlds: traditional pages rendered on the server and
            new-school, interactive client-side web applications.
          </Text>
          <Text py={1}>
            On the first page load the website is rendered on the server.
            Required CSS is inlined, so the site can be rendered without any
            additional HTTP requests. This results in the fastest possible time
            to first paint. After that, the client takes over and from that
            point onwards, only additional data and logic of the page is loaded.
          </Text>
          <Text py={1}>
            The biggest advantage of this stack is that the developer experience
            does not suffer from the focus on page speed. The exact same code
            runs on the server and in the browser. Changed code is hot-loaded
            instantly. Data fetching and routing is already set up.
          </Text>
          <Text py={1}>
            You can take a <LocalLink to="/tour">Tour</LocalLink> of the cool
            things this web app does. The tour shows off some unique features
            enabled by the modern stack the site is built on.
          </Text>
        </Box>
        <Box mx="auto" mt={4}>
          <LocalLink to="/tour">
            <PrimaryButton>Take Tour</PrimaryButton>
          </LocalLink>
        </Box>
      </Layout>
    );
  }
}
