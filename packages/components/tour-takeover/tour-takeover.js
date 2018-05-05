/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Helmet } from 'react-helmet';
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
  PrimaryButton,
} from '@wa/design-system';
import { Layout } from '../layout';

// This console log is part of the Client-Side Takeover tour.
// It should not be removed.
// eslint-disable-next-line no-console
console.log('The client has now taken over the rendering');

class ClickCount extends React.Component {
  static displayName = 'ClickCount';
  state = {
    count: 0,
  };
  render() {
    return (
      <React.Fragment>
        <PrimaryButton
          onClick={() =>
            this.setState(prevState => ({ count: prevState.count + 1 }))
          }
        >
          Increment
        </PrimaryButton>
        <Text pt={2}>
          You clicked {this.state.count}{' '}
          {this.state.count === 1 ? 'time' : 'times'}.
        </Text>
      </React.Fragment>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export class TourTakeover extends React.Component {
  static displayName = 'TourTakeover';
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Client-Side Takeover in Lovely Webapp</title>
        </Helmet>
        <Heading.h2 pt={[0, 3]} mt={[2, 3]}>
          Client-Side Takeover
        </Heading.h2>
        <Box pt={1} pb={2}>
          <Breadcrumbs>
            <LocalLink to="/">Lovely Webapp</LocalLink>
            <LocalLink to="/tour">Tour</LocalLink>
            <LocalLink to="/tour/server-side-rendering">
              Server-Side Rendering
            </LocalLink>
            <Text>Client-Side Takeover</Text>
          </Breadcrumbs>
        </Box>
        <Lead py={2}>
          Traditional non-static websites are rendered by the server. Every
          navigation triggers a new request to the server. This results in
          unnecessary data transfer which modern stacks can avoid.
        </Lead>
        <Text py={1}>
          On the first page load the server renders the application to enable
          the browser to show the page immediately, without having to download
          or parse any JavaScript assets. This results in the fastest possible
          time-to-first-paint. Then the browser loads, parses and executes the
          application bundle. The website is interactive from then on and the
          client takes over.
        </Text>
        <Text py={1}>
          At this point the website becomes interactive. This usually happens so
          fast that users stay completely unaware of it. Subsequent routing
          actions are handled on the client. When the next page can be shown
          without needing to load any additional bundle or data, the client
          simply renders it. No roundtrip to the server is necessary. In case
          data is needed, the client requests the missing data only. It already
          knows how to display it, so it doesn&apos;t need to load the styles or
          request any HTML again. This minimal transfer of information keeps the
          load on the servers low and enables fast page transitions.
        </Text>
        <Subhead pt={2} pb={1}>
          Interactivity after bundle load
        </Subhead>
        <Text py={1}>
          This part is a bit hard to demo, but we can achieve it with the help
          of Google Chrome&apos;s developer tools. You can simulate a very slow
          connection by going to Network tab of the developer tools in Google
          Chrome. Select the &quot;Fast 3G&quot; preset from the connection
          speeds. Now do full refresh. You&apos;ll notice that nothing happens
          when clicking the button below until a certain chunk has been loaded
          in the network tab. When that chunk is loaded, executed and parsed the
          site is fully interactive. A special &quot;The client has now taken
          over the rendering&quot; text will be logged to the console at that
          point as well.
        </Text>
        <Measure ml={[0, 3]}>
          <Card my={[2, 3]} p={3}>
            <ClickCount />
          </Card>
        </Measure>
        <Text py={1}>
          Alternatively, you can watch the screen recording below where I went
          through these steps for you.
        </Text>
        <Card my={[2, 3]} p={3}>
          <video src="/takeover.mp4" autoPlay loop style={{ width: '100%' }}>
            <track
              label="English"
              kind="subtitles"
              srcLang="en"
              src="/takeover.vtt"
              default
            />
            Sorry, your browser doesn&apos;t support embedded videos, but
            don&apos;t worry, you can <a href="/takeover.mp4">download it</a>
            and watch it with your favorite video player!
          </video>
        </Card>
        <Text py={1}>
          This section has shown how we can achieve immediate rendering of the
          site&apos;s content while not losing any interactivity. The next
          section will show how we can use that to our advantage when routing.
        </Text>
        <Subhead pt={2} pb={1}>
          Client-side routing
        </Subhead>
        <Text py={1}>
          The server renders the initial page, and it needs to be able to render
          every page which should benefit from server-side rendering. Once the
          browser takes over we can do the routing on the client.
        </Text>
        <Text py={1}>
          You can see this in action by going back and forth between the{' '}
          <LocalLink to="/tour">Tour overview</LocalLink> and this page. Keep
          the Network tab open in Google Chromes&apos; developer tools to verify
          for your self that no additional HTML is loaded.
        </Text>
        <Text py={1}>
          When you watch the network tab while navigating to other parts of this
          site, you&apos;ll notice that some additional chunks will be loaded.
          Those are parts of this web application which have been split out to
          keep the size of the individual chunks lower. Every route or component
          of the application can be split out into separate chunks, so that the
          browser only needs to load whatever it needs to render the current
          view.
        </Text>
        <Card my={[2, 3]} p={3}>
          <video
            src="/incremental-load.mp4"
            autoPlay
            loop
            style={{ width: '100%' }}
          >
            Sorry, your browser doesn&apos;t support embedded videos, but
            don&apos;t worry, you can{' '}
            <a href="/incremental-load.mp4">download it</a>
            and watch it with your favorite video player!
          </video>
        </Card>
        <Subhead pt={4}>Summary</Subhead>
        <Text py={1}>
          <ul>
            <li>server renders initial HTML</li>
            <li>this leads to fast time-to-first-render</li>
            <li>however, app is not interactive until bundle is loaded</li>
            <li>subsequent routing happens on the client only</li>
            <li>
              only additional data, styles and logic chunks are fetched, no more
              HTML
            </li>
          </ul>
        </Text>
      </Layout>
    );
  }
}
