/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Text,
  Heading,
  Subhead,
  Link,
  LocalLink,
  Lead,
  Flex,
  Box,
} from '@wa/design-system';
import { ScrollToTop } from '../scroll-to-top';
import { NewsletterSubscriptionBox } from '../NewsletterSubscriptionBox';
import { TourSectionAccountSystem } from '../tour-section-account-system';

export class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ScrollToTop />
        <Helmet>
          <title>Home of Lovely Webapp</title>
        </Helmet>
        <Flex>
          <Box mx={[-2, 2, 6]} px={[-2, 0, 8]} pt={[0, 2]} mt={[3, 5]}>
            <LocalLink to="/">
              <img src="/favicon.png" alt="home" width="32" />
            </LocalLink>
          </Box>
        </Flex>
        <Flex>
          <Box mx={[-2, 2, 6]} px={[-2, 0, 8]} pt={[0, 2]} mt={2}>
            <Heading.h1 fontSize={6}>Lovely Webapp</Heading.h1>
          </Box>
        </Flex>
        <Flex>
          <Box mx={[-2, 2, 6]} px={[-2, 0, 8]} pt={2} pb={2}>
            <Lead>
              This site is built to show off how the latest web technologies can
              be combined to create the foundation of a solid web application.
            </Lead>
          </Box>
        </Flex>
        <Flex>
          <Box mx={[-2, 2, 6]} px={[-2, 0, 8]} py={3}>
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
              additional HTTP requests. This results in the fastest possible
              time to first paint. After that, the client takes over and from
              that point onwards, only additional data and logic of the page is
              loaded.
            </Text>
            <Text py={1}>
              The biggest advantage of this stack is that the developer
              experience does not suffer from the focus on page speed. The exact
              same code runs on the server and in the browser.
            </Text>
            <Text py={1}>
              You can take a <LocalLink to="/tour">Tour</LocalLink> of the cool
              things this web app does. The tour shows off some unique features
              enabled by the modern stack the site is built on.
            </Text>
            <Heading.h2 pt={4} pb={1}>
              Table of Contents
            </Heading.h2>
            <ol>
              <li>
                Tour
                <ol>
                  <li>
                    <Link href="#account-system">Account System</Link>
                  </li>
                </ol>
              </li>
              <li>
                Comparison to alternatives
                <ol>
                  <li>
                    <Link href="#account-system">Gatsby</Link>
                  </li>
                </ol>
              </li>
            </ol>
            <Heading.h2 pt={4} pb={1}>
              1. Tour
            </Heading.h2>
            <Text py={1}>
              The tour shows different features of this site. The tour will be
              extended as the site grows. Articles about the stack will be
              released incrementally. Sign up below if you want to get
              notifications when new articles are released.
            </Text>
            <NewsletterSubscriptionBox />
            <a id="account-system" name="account-system" />
            <TourSectionAccountSystem />
            <Heading.h2 pt={4} pb={1}>
              Comparison to alternatives
            </Heading.h2>
            <Text py={1}>
              There are many great web application stacks out there, each with
              their own traits. This section outlines the differences and what
              the Lovely Stack is useful for.
            </Text>
            <Subhead pt={2} pb={1}>
              Gatsby
            </Subhead>
            <Text py={1}>
              <Link href="https://www.gatsbyjs.org/" target="_blank">
                Gatsby
              </Link>{' '}
              is a wonderful static site generator. Gatsby is great for static
              sites where the page content changes seldomly, and in which most
              routes are publicly accessible.
            </Text>
            <Text py={1}>
              In comparison, the Lovely Website&#39;s stack is better suited for
              sites which have regularily changing content, or where most sites
              need authentication.
            </Text>
            <Text py={1}>
              The essential architectural difference is that Gatsby requires you
              to recreate the static sites on every data change, while the
              lovely stack performs real server-side rendering upon every
              request. This can be a good or a bad thing. When data changes are
              rare, it&#39;s better to generate the static site upon every data
              change. However, when regular data changes can be expected, the
              regeneration of the static sites can fall behind. In this case,
              it&#39;s better to use the Lovely Stack.
            </Text>
            <Text py={1}>
              There are possible escape hatches for both stacks to compensate
              for their downsides. With Gatsby, it&#39;s possible to avoid
              rendering the very dynamic data on the server and let clients
              handle it instead, at the cost of losing server-side rendering for
              those parts. Then the site does not need to be redeployed when
              updates are made. With the Lovely Stack, it&#39;s possible to use
              a Redis server to cache the responses for parts of the sites which
              are known to be static. Then the more costly server-side rendering
              can be avoided for sites that are unlikely to change. However this
              comes with the cost that no CDN can be used to host the static
              parts across the globe.
            </Text>
            <Text py={1}>
              <i>
                I don&#39;t have any experience with Gatsby and this comparison
                was written based on chats with colleagues and articles I&#39;ve
                read. If something is off, I&#39;m happy to correct it. You can
                let me know{' '}
                <Link href="https://twitter.com/dferber90" target="_blank">
                  on Twitter
                </Link>.
              </i>
            </Text>
          </Box>
        </Flex>
      </React.Fragment>
    );
  }
}
