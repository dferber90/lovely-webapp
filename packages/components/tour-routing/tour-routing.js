/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Breadcrumbs,
  LocalLink,
  Link,
  Text,
  Card,
  Measure,
  Image,
  Box,
  Heading,
  Lead,
  Subhead,
} from '@wa/design-system';
import { Layout } from '../layout';

export class TourRouting extends React.Component {
  static displayName = 'TourRouting';
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Routing in Lovely Webapp</title>
        </Helmet>
        <Heading.h2 pt={[0, 3]} mt={[2, 3]}>
          Routing
        </Heading.h2>
        <Box pt={1} pb={2}>
          <Breadcrumbs>
            <LocalLink to="/">Lovely Webapp</LocalLink>
            <LocalLink to="/tour">Tour</LocalLink>
            <LocalLink to="/tour/server-side-rendering">
              Server-Side Rendering
            </LocalLink>
            <Text>Routing</Text>
          </Breadcrumbs>
        </Box>
        <Lead py={2}>
          Interesting challenges are that the client and the server need to know
          about the application routes. Additonally, the server needs to serve
          static assets. Both need to be able to do redirects and render 404
          pages.
        </Lead>
        <Subhead pt={2} pb={1}>
          Static assets
        </Subhead>
        <Text py={1}>
          Let&apos;s start simple. The server needs to respond with static
          assets like images and JS bundles when hit with a request. The favicon
          is one such asset. You can see below that it gets rendered nicely when
          the browser requests the image.
        </Text>
        <Measure>
          <Card my={2}>
            <Image
              p={2}
              style={{ transform: 'scale(0.5)' }}
              src="/favicon.png"
              alt="FavIcon"
            />
          </Card>
        </Measure>
        <Subhead pt={2} pb={1}>
          Rendering known routes
        </Subhead>
        <Text py={1}>
          The frontend server is hit with the original request for a page. When
          the request does not match any of the static resources, the server
          renders the application. Reload this page to see the server-side
          rendering in action for this route.
        </Text>
        <Text py={1}>
          Navigate using the links on this page to see the client-side routing
          in action. You&apos;ll notice that no HTML is loaded over the network.
          Only additional resources like assets, images and GraphQL data are
          loaded, in case the new route needs them.
        </Text>
        <Subhead pt={2} pb={1}>
          Rendering unknown routes (404 pages)
        </Subhead>
        <Text py={1}>
          The application is able to render 404 pages and to send the 404 status
          code in case an unknown URL is provided.
        </Text>
        <Text py={1}>
          Check out the link to a non-existent site below to see the 404 page
          get rendered by the server. You can also check out the network tab
          your browser&apos;s Developer Tools to verify the status code.
        </Text>
        <Measure ml={[0, 3]}>
          <Card my={[2, 3]} p={3}>
            <Text>On server</Text>
            <Link href="/unknown-page" target="_blank">
              /unknown-page
            </Link>
          </Card>
        </Measure>
        <Text py={1}>The same works when routing on the client:</Text>
        <Measure ml={[0, 3]}>
          <Card my={[2, 3]} p={3}>
            <Text>On client</Text>
            <LocalLink to="/unknown-page">/unknown-page</LocalLink>
          </Card>
        </Measure>
        <Subhead pt={2} pb={1}>
          Redirects
        </Subhead>
        <Text py={1}>
          In case the application wants to redirect the user, that information
          is attached to a routing context. Before responding with the rendered
          output, the server checks the routing context for a redirect. When
          present, the server responds with an HTTP redirect and the status code
          the application left.
        </Text>
        <Text py={1}>
          You can see it in action by following the link below. It will open in
          a new tab, thus making a request to the server. The server will open{' '}
          <code>/redirect-to-tour</code> which redirects you to this page again.
          It will use status code <code>302</code> for the redirect, which is
          specified from the application.
        </Text>
        <Measure ml={[0, 3]}>
          <Card my={[2, 3]} p={3}>
            <Text>On server</Text>
            <Link href="/redirect-to-tour" target="_blank">
              /redirect-to-tour
            </Link>
          </Card>
        </Measure>
        <Text py={1}>
          The same redirect also works on the client. Follow the link below to
          be redirected from the client.
        </Text>
        <Measure ml={[0, 3]}>
          <Card my={[2, 3]} p={3}>
            <Text>On client</Text>
            <LocalLink to="/redirect-to-tour">/redirect-to-tour</LocalLink>
          </Card>
        </Measure>
      </Layout>
    );
  }
}
