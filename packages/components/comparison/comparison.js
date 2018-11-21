import React from 'react';
import {
  Heading,
  Text,
  Subhead,
  Link,
  Box,
  Breadcrumbs,
  LocalLink,
  Lead,
  Code,
} from '@wa/design-system';
import { Helmet } from 'react-helmet';
import { Layout } from '../layout';

export class Comparison extends React.Component {
  static displayName = 'Comparison';

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Comparison of Lovely Webapp</title>
        </Helmet>
        <Box pt={[0, 3]} mt={[2, 3]}>
          <Heading.h2>Comparison to alternatives</Heading.h2>
        </Box>
        <Box pt={1} pb={2}>
          <Breadcrumbs>
            <LocalLink to="/">Lovely Webapp</LocalLink>
            <Text>Comparison</Text>
          </Breadcrumbs>
        </Box>
        <Box pt={2} pb={2}>
          <Lead>
            There are many great web application stacks out there, each with
            their own traits. This section outlines the differences and what the
            Lovely Stack is useful for.
          </Lead>
        </Box>
        <Subhead pt={3} pb={1}>
          Gatsby
        </Subhead>
        <Text py={1}>
          <Link href="https://www.gatsbyjs.org/" target="_blank">
            Gatsby
          </Link>
          {' '}
          is a wonderful static site generator. Gatsby is great for static sites
          where the page content changes seldomly, and in which most routes are
          publicly accessible.
        </Text>
        <Text py={1}>
          In comparison, the Lovely Website&apos;s stack is better suited for
          sites which have regularily changing content, or where most sites need
          authentication.
        </Text>
        <Text py={1}>
          The essential architectural difference is that Gatsby requires you to
          recreate the static sites on every data change, while the lovely stack
          performs real server-side rendering upon every request. This can be a
          good or a bad thing. When data changes are rare, it&apos;s better to
          generate the static site upon every data change. However, when regular
          data changes can be expected, the regeneration of the static sites can
          fall behind. In this case, it&apos;s better to use the Lovely Stack.
        </Text>
        <Text py={1}>
          There are possible escape hatches for both stacks to compensate for
          their downsides. With Gatsby, it&apos;s possible to avoid rendering the
          very dynamic data on the server and let clients handle it instead, at
          the cost of losing server-side rendering for those parts. Then the
          site does not need to be redeployed when updates are made. With the
          Lovely Stack, it&apos;s possible to use a Redis server to cache the
          responses for parts of the sites which are known to be static. Then
          the more costly server-side rendering can be avoided for sites that
          are unlikely to change. However this comes with the cost that no CDN
          can be used to host the static parts across the globe.
        </Text>
        <Text py={1}>
          <i>
            I don&apos;t have any experience with Gatsby and this comparison was
            written based on chats with colleagues and articles I&apos;ve read.
            If something is off, I&apos;m happy to correct it. You can let me
            know
            {' '}
            <Link href="https://twitter.com/dferber90" target="_blank">
              on Twitter
            </Link>
.
          </i>
        </Text>
        <Subhead pt={3} pb={1}>
          create-react-app
        </Subhead>
        <Text py={1}>
          <Link
            href="https://github.com/facebook/create-react-app/"
            target="_blank"
          >
            <Code>create-react-app</Code>
          </Link>
          {' '}
          is huge timesaver when staring new React projects. It is very beginner
          friendly and offers a great developer experience.
        </Text>
        <Text py={1}>
          <Code>create-react-app</Code>
          {' '}
is only concerned with the frontend
          bundle. It doesn&apos;t have server-side rendering, nor does it come
          with any solution for data fetching or a database. It is a basic
          starting point for the frontend part of web applications.
        </Text>
        <Subhead pt={3} pb={1}>
          Razzle
        </Subhead>
        <Text py={1}>
          <Link href="https://github.com/jaredpalmer/razzle" target="_blank">
            Razzle
          </Link>
          {' '}
          is similar to
          {' '}
          <Link
            href="https://github.com/facebook/create-react-app/"
            target="_blank"
          >
            <Code>create-react-app</Code>
          </Link>
. Razzle comes with server-side rendering out of the box.
          However, it doesn&apos;t have any solution to routing or data fetching
          included. Those are hard to get right and it&apos;s up to the user of
          Razzle to set these things up. Razzle further doesn&apos;t include any
          data backend. Razzle uses
          {' '}
          <Link
            href="https://github.com/css-modules/css-modules"
            target="_blank"
          >
            CSS Modules
          </Link>
          {' '}
          for styling whereas this project uses
          {' '}
          <Link href="https://www.styled-components.com/" target="_blank">
            styled-components
          </Link>
. The biggest advantage of
          <Code>styled-components</Code>
          {' '}
in is
          that they are ideal to set up a design system which cultivates the
          usages of best practices like the usage of design tokens.
        </Text>
        <Text py={1}>
          It feels like the Lovely Stack could be built on top of Razzle. The
          Lovely Stack is more concrete in some areas, whereas Razzle offers
          more flexibility and leaves more decisions up to the developer.
        </Text>
      </Layout>
    );
  }
}
