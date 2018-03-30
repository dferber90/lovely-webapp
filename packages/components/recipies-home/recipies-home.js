import React from 'react';
import {
  Code,
  Text,
  Breadcrumbs,
  LocalLink,
  Box,
  Lead,
  Heading,
} from '@wa/design-system';
import { Helmet } from 'react-helmet';
import { NewsletterSubscriptionBox } from '../newsletter-subscription-box';
import { Layout } from '../layout';

export class RecipiesHome extends React.Component {
  static displayName = 'RecipiesHome';
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Recipies of Lovely Webapp</title>
        </Helmet>
        <Box pt={[0, 2]} mt={2}>
          <Heading.h2>Recipies</Heading.h2>
        </Box>
        <Box pt={1} pb={2}>
          <Breadcrumbs>
            <LocalLink to="/">Lovely Webapp</LocalLink>
            <Text>Recipies</Text>
          </Breadcrumbs>
        </Box>
        <Box pt={2} pb={2}>
          <Lead>Recipies show the way this site is built.</Lead>
        </Box>
        <ul>
          <li>
            Performance
            <ul>
              <li>
                Server-Side Rendering
                <ul>
                  <li>Images</li>
                  <li>Styles</li>
                  <li>Markup</li>
                  <li>Data Fetching & Inlining</li>
                </ul>
              </li>
              <li>
                Dead Code Elimination (<Code>DEV</Code> and <Code>SERVER</Code>{' '}
                constants)
              </li>
              <li>Apollo & GraphQL</li>
              <li>GZipping</li>
              <li>Code Splitting</li>
              <li>Only loads required data (GraphQL)</li>
              <li>Inlines data loaded on server</li>
              <li>Vendor chunk</li>
              <li>Client takeover</li>
            </ul>
          </li>
          <li>
            Developer Experience
            <ul>
              <li>Hot Loading</li>
              <li>GraphiQL</li>
              <li>Automatic Server Restarts</li>
              <li>Design System</li>
              <li>Building locally</li>
              <li>Continuous Integration</li>
              <li>Continuous Deployment</li>
            </ul>
          </li>
          <li>
            Features
            <ul>
              <li>Page title & Meta Tags</li>
              <li>
                Authentication
                <ul>
                  <li>Signup</li>
                  <li>Login</li>
                  <li>Cookie-based auth</li>
                  <li>Protected Routes</li>
                </ul>
              </li>
              <li>
                Data
                <ul>
                  <li>Data Fetching</li>
                  <li>Data Manipulation (even without refetching)</li>
                </ul>
              </li>
              <li>
                Routing
                <ul>
                  <li>404</li>
                  <li>
                    Redirect
                    <ul>
                      <li>Client-Side</li>
                      <li>Server-Side</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            Common stuff
            <ul>
              <li>Linting</li>
              <li>Testing</li>
              <li>Minification</li>
              <li>Source Maps</li>
              <li>Babel compilation</li>
            </ul>
          </li>
        </ul>
        <Text py={1}>
          The recipies will be extended as the site grows. Articles about the
          stack will be released incrementally. Sign up below if you want to get
          notifications when new articles are released.
        </Text>
        <NewsletterSubscriptionBox />
      </Layout>
    );
  }
}
