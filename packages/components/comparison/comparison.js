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
        <Subhead pt={2} pb={1}>
          Gatsby
        </Subhead>
        <Text py={1}>
          <Link href="https://www.gatsbyjs.org/" target="_blank">
            Gatsby
          </Link>{' '}
          is a wonderful static site generator. Gatsby is great for static sites
          where the page content changes seldomly, and in which most routes are
          publicly accessible.
        </Text>
        <Text py={1}>
          In comparison, the Lovely Website&#39;s stack is better suited for
          sites which have regularily changing content, or where most sites need
          authentication.
        </Text>
        <Text py={1}>
          The essential architectural difference is that Gatsby requires you to
          recreate the static sites on every data change, while the lovely stack
          performs real server-side rendering upon every request. This can be a
          good or a bad thing. When data changes are rare, it&#39;s better to
          generate the static site upon every data change. However, when regular
          data changes can be expected, the regeneration of the static sites can
          fall behind. In this case, it&#39;s better to use the Lovely Stack.
        </Text>
        <Text py={1}>
          There are possible escape hatches for both stacks to compensate for
          their downsides. With Gatsby, it&#39;s possible to avoid rendering the
          very dynamic data on the server and let clients handle it instead, at
          the cost of losing server-side rendering for those parts. Then the
          site does not need to be redeployed when updates are made. With the
          Lovely Stack, it&#39;s possible to use a Redis server to cache the
          responses for parts of the sites which are known to be static. Then
          the more costly server-side rendering can be avoided for sites that
          are unlikely to change. However this comes with the cost that no CDN
          can be used to host the static parts across the globe.
        </Text>
        <Text py={1}>
          <i>
            I don&#39;t have any experience with Gatsby and this comparison was
            written based on chats with colleagues and articles I&#39;ve read.
            If something is off, I&#39;m happy to correct it. You can let me
            know{' '}
            <Link href="https://twitter.com/dferber90" target="_blank">
              on Twitter
            </Link>.
          </i>
        </Text>
      </Layout>
    );
  }
}
