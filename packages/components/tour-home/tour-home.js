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
        <Box pt={[0, 3]} mt={[2, 3]}>
          <Heading.h2>Tour</Heading.h2>
        </Box>
        <Box pt={1} pb={2}>
          <Breadcrumbs>
            <LocalLink to="/">Lovely Webapp</LocalLink>
            <Text>Tour</Text>
          </Breadcrumbs>
        </Box>
        <Box pt={2} pb={2}>
          <Lead>Learn about the features which make this site so lovely.</Lead>
        </Box>
        <ul>
          <li>
            <LocalLink to="/tour/account-system">Account System</LocalLink>
          </li>
          <li>
            <LocalLink to="/tour/server-side-rendering">
              Server-Side Rendering
            </LocalLink>
            <ul>
              <li>
                <LocalLink to="/tour/client-side-takeover">
                  Client-Side Takeover
                </LocalLink>
              </li>
              <li>
                <LocalLink to="/tour/routing">Routing</LocalLink>
              </li>
              <li>Data Fetching</li>
              <li>Data Inlining &amp; Rehydration</li>
            </ul>
          </li>
          <li>Code-Splitting & Inlining of required chunk</li>
          <li>Build output (one folder for frontend, one for api)</li>
          <li>
            <LocalLink to="/tour/images">
              Image loading on server and client
            </LocalLink>
          </li>
          <li>Page title and meta information</li>
          <li>Form with validation, error handling and immediate updates</li>
          <li>Continuous Delivery</li>
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
