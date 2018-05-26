/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Helmet } from 'react-helmet';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  Breadcrumbs,
  LocalLink,
  Text,
  Card,
  Measure,
  Box,
  Heading,
  Lead,
  Subhead,
} from '@wa/design-system';
import { FriendlyLoader } from '../friendly-loader';
import { Layout } from '../layout';

const GET_FEED = gql`
  query feedQuery {
    feed {
      id
      description
    }
  }
`;

export class TourDataFetching extends React.Component {
  static displayName = 'TourDataFetching';
  state = {
    apolloState: {},
  };
  componentDidMount() {
    // We use setState here to ensure that the output rendered on the server
    // matches the one when rendering on the client for the first time.
    //
    this.foo = setInterval(() => {
      // eslint-disable-next-line no-undef, react/no-did-mount-set-state
      this.setState({ apolloState: window.APOLLO_STATE });
    }, 500);
  }
  componentWillUnmount() {
    clearInterval(this.foo);
    this.foo = null;
  }
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Data Fetching in Lovely Webapp</title>
        </Helmet>
        <Heading.h2 pt={[0, 3]} mt={[2, 3]}>
          Data Fetching
        </Heading.h2>
        <Box pt={1} pb={2}>
          <Breadcrumbs>
            <LocalLink to="/">Lovely Webapp</LocalLink>
            <LocalLink to="/tour">Tour</LocalLink>
            <LocalLink to="/tour/server-side-rendering">
              Server-Side Rendering
            </LocalLink>
            <Text>Data Fetching</Text>
          </Breadcrumbs>
        </Box>
        <Lead py={2}>
          To render the initially requested page the server needs to be able to
          fetch all requried data, as defined by the application. Once all data
          is loaded, the server can respond. For subsequent pages loaded by the
          client, the client needs to be able to fetch data as well. This is not
          a problem thanks to declarative data fetching with GraphQL and Apollo.
        </Lead>
        <Subhead pt={2} pb={1}>
          Fetching on the server
        </Subhead>
        <Text py={1}>
          Reload this page and inspect the rendered HTML. You&apos;ll see that
          the initial HTML already contains the dynamically loaded data of the
          list of posts below.
        </Text>
        <Measure>
          <Card my={2}>
            <Query query={GET_FEED}>
              {({ loading, error, data: { feed } }) => {
                if (loading) return <FriendlyLoader />;
                if (error) return <FriendlyLoader error={error} />;
                return (
                  <ul>
                    {feed &&
                      feed.map(post => (
                        <li key={post.id}>{post.description}</li>
                      ))}
                  </ul>
                );
              }}
            </Query>
          </Card>
        </Measure>
        <Subhead pt={2} pb={1}>
          Fetching on the client
        </Subhead>
        <Text py={1}>
          The server also inlines the fetched data, so that the client can
          rehydrate the state without having to fetch again. The state provided
          by the server is stored under <code>window.APOLLO_STATE</code>. You
          can see the content below:
        </Text>
        <Measure>
          <Card my={2}>
            <code>{JSON.stringify(this.state.apolloState, null, 2)}</code>
          </Card>
        </Measure>
        <Text py={1}>
          Because of the cache in <code>window.APOLLO_STATE</code>, we usually
          don&apos;t need to fetch any data when rendering on the client for the
          first time as the client already has all the data required for the
          current view.
        </Text>
        <Text py={1}>
          As an example to see the client fetches in action, you could start{' '}
          <LocalLink to="/tour">the tour view</LocalLink>. Do a full page reload
          there to reset the cache. Then, open the Network panel in your browser
          to see which data is being fetched. Finally, navigate to this page
          which will fetch data.
        </Text>
        <Text py={1}>Or you can just watch this video:</Text>
        <Card my={[2, 3]} p={3}>
          <video
            src="/data-fetching.mp4"
            loop
            style={{ width: '100%' }}
            controls
          >
            <track
              label="English"
              kind="subtitles"
              srcLang="en"
              src="/data-fetching.vtt"
              default
            />
            Sorry, your browser doesn&apos;t support embedded videos, but
            don&apos;t worry, you can{' '}
            <a href="/data-fetching.mp4">download it</a>
            and watch it with your favorite video player!
          </video>
        </Card>
      </Layout>
    );
  }
}
