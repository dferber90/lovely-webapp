/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Breadcrumbs,
  LocalLink,
  Text,
  Box,
  Heading,
  Lead,
  Subhead,
} from '@wa/design-system';
import { Layout } from '../layout';

// eslint-disable-next-line react/no-multi-comp
export class TourServerSideRendering extends React.Component {
  static displayName = 'TourServerSideRendering';

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Server-Side Rendering in Lovely Webapp</title>
        </Helmet>
        <Heading.h2 pt={[0, 3]} mt={[2, 3]}>
          Server-Side Rendering
        </Heading.h2>
        <Box pt={1} pb={2}>
          <Breadcrumbs>
            <LocalLink to="/">Lovely Webapp</LocalLink>
            <LocalLink to="/tour">Tour</LocalLink>
            <Text>Server-Side Rendering</Text>
          </Breadcrumbs>
        </Box>
        <Lead py={2}>
          Rendering dynamic pages on the server for fast page loads.
        </Lead>
        <Text py={1}>
          On the first page load the server renders the application to enable
          the browser to show the page immediately, without having to download
          or parse any JavaScript assets. This results in the fastest possible
          time-to-first-paint. The server also inlines critical CSS and the data
          used to render the page.
        </Text>
        <Subhead pt={2} pb={1}>
          Considerations
        </Subhead>
        <Text py={1}>
          There are many things to consider when rendering on the server with
          {' '}
          <LocalLink to="/tour/client-side-takeover">
            Client-Side Takeover
          </LocalLink>
. For
          <LocalLink to="/tour/routing">Routing</LocalLink>
,
          the client and the server need to be aware of all routes including
          redirects and 404 pages. Both must be able to handle
          {' '}
          <LocalLink to="/tour/account-system">authentication</LocalLink>
          {' '}
and
          {' '}
          <LocalLink to="/tour/data-fetching">data fetching</LocalLink>
.
        </Text>
        <Text py={1}>
          Luckily, this stack has all these things figured out.
        </Text>
        <Subhead pt={2} pb={1}>
          HTML
        </Subhead>
        <Text py={1}>
          Reload this page and view the source code. You&apos;ll see that the
          server responds with the full HTML markup of the whole page. This is
          great for the site&apos;s ranking in search engines.
        </Text>
      </Layout>
    );
  }
}
