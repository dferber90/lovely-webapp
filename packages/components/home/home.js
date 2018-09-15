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
  Link,
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
            This site is built to show how the latest web technologies can be
            combined to create the foundation of a solid, server-rendered web
            application with client-side takeover, an authentication system and
            persistent data.
          </Lead>
        </Box>
        <Box py={3}>
          <Subhead pt={2} pb={1}>
            What is this site for?
          </Subhead>
          <Text py={1}>
            This site aims to serve as a continuously improving foundation of a
            solid web application. It is meant to show how traditionally
            hard-to-achieve features are made possible with a modern stack. It
            is meant as a reference point, an insipiration and proof that a
            modern stack can fulfill the needs of web applications.
          </Text>
          <Text py={1}>
            The source code is available at
            {' '}
            <Link href="https://github.com/dferber90/lovely-webapp" target="_blank">
              github.com/dferber90/lovely-webapp
            </Link>
.
          </Text>
          <Subhead pt={2} pb={1}>
            Why?
          </Subhead>
          <Text py={1}>
            Many web applications share roughly the same requirements: They
            should load fast, be able to have dynamic content, provide an
            authentication mechanism, have consistent styling, be visible to
            search engines and be fun to develop. When I noticed that overlap in
            requirements, I set out to create a boilerplate for my dream stack -
            and failed. That was two years ago.
          </Text>
          <Text py={1}>
            In the meantime many great new libraries and technologies like
            GraphQL, Apollo, styled-components, Prisma and many others were
            developed which made the whole setup easier. So, after these two
            years I tried again and I&apos;m quite happy with the result. I was
            able to set up a site which fulfills all the requirements I would
            have for a solid web application.
          </Text>
          <Text py={1}>
            This site is proof, inspiration and a guide of how to combine modern
            tools into a real production-ready stack.
          </Text>
          <Subhead pt={2} pb={1}>
            Why not?
          </Subhead>
          <Text py={1}>
            This site is - so far - a leisure-time experiment to see what an
            ideal web application stack for specific requirements would look
            like. It&apos;s likely that you may have different requirements for
            your site for which a differnt staring point is more appropriate.
            See the 
            {' '}
            <LocalLink to="/comparison">Comparison</LocalLink>
            {' '}
section
            for alternatives and a comparison of use-cases.
          </Text>
          <Text py={1}>
            While I&apos;m very confident about some parts of the stack,
            other&apos;s still need some more love.
          </Text>
          <Subhead pt={2} pb={1}>
            What makes this site so lovely?
          </Subhead>
          <ul>
            <li>Server-Side Rendering</li>
            <li>Routing</li>
            <li>Authentication System</li>
            <li>Data Fetching and Caching</li>
            <li>Design System</li>
            <li>Continuous Delivery</li>
            <li>Test Setup</li>
          </ul>
          <Text py={1}>
            There&apos;s much more about this site though. Articles about
            features of this website will be published every now and then. You
            can subscribe to them in the tour section.
          </Text>
          <Subhead pt={2} pb={1}>
            The gist
          </Subhead>
          <Text py={1}>
            This foundation enables incredibly fast page loads, while still
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
            As a result, subsequently opened pages are loaded even faster than
            the inital page.
          </Text>
          <Text py={1}>
            The biggest advantage of this stack is that neither the developer
            experience nor the interactivity suffer from the focus on page
            speed. The exact same code runs on the server and in the browser.
            During development, changed code is hot-loaded instantly. Data
            fetching, authentication and routing is already set up.
          </Text>
          <Text py={1}>
            You can take a 
            {' '}
            <LocalLink to="/tour">Tour</LocalLink>
            {' '}
of the cool
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
