import React from 'react';
import {
  LocalLink,
  Text,
  Breadcrumbs,
  Box,
  Lead,
  Heading,
} from '@wa/design-system';
import { Helmet } from 'react-helmet';
import { NewsletterSubscriptionBox } from '../newsletter-subscription-box';
import { Layout } from '../layout';

export class TourHome extends React.Component {
  static displayName = 'TourHome';
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Tour of Lovely Webapp</title>
        </Helmet>
        <Box pt={[0, 2]} mt={2}>
          <Heading.h2>Tour</Heading.h2>
        </Box>
        <Box pt={1} pb={2}>
          <Breadcrumbs>
            <LocalLink to="/">Lovely Webapp</LocalLink>
            <Text>Tour</Text>
          </Breadcrumbs>
        </Box>
        <Box pt={2} pb={2}>
          <Lead>
            The tour shows different features of this site. The tour will be
            extended as the site grows. Articles about the stack will be
            released incrementally. Sign up below if you want to get
            notifications when new articles are released.
          </Lead>
        </Box>
        <ul>
          <li>
            <LocalLink to="/tour/account-system">Account System</LocalLink>
          </li>
          <li>Server-Side Rendering & Data Inlining & Hydration</li>
          <li>Client-side Takeover</li>
          <li>Code-Splitting & Inlining of required chunk</li>
          <li>Redirects on server (with HTTP status) and on client</li>
          <li>Build output (one folder for frontend, one for api)</li>
          <li>
            <LocalLink to="/tour/images">
              Image loading on server and client
            </LocalLink>
          </li>
          <li>Page title and meta information</li>
          <li>Form with validation, error handling and immediate updates</li>
          <li>Continuous Deployment</li>
        </ul>
        <Text py={1}>
          The tour will be extended as the site grows. Articles about the stack
          will be released incrementally. Sign up below if you want to get
          notifications when new articles are released.
        </Text>
        <NewsletterSubscriptionBox />
      </Layout>
    );
  }
}
