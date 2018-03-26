import React from 'react';
import { Code } from '@wa/design-system';
import { Page } from '../page';

export class Tour extends React.Component {
  static displayName = 'Tour';
  render() {
    return (
      <Page heading="Tour" lead="Cool stuff this lovely site does">
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
      </Page>
    );
  }
}
