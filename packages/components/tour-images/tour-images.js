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
  Image,
  Subhead,
} from '@wa/design-system';
import { Layout } from '../layout';
import partyParrotUrl from '../assets/party-parrot.png';

export class TourImages extends React.Component {
  static displayName = 'TourImages';
  render() {
    return (
      <Layout>
        <Helmet>
          <title>Images of Lovely Webapp</title>
        </Helmet>
        <Heading.h2 pt={[0, 3]} mt={[2, 3]}>
          Images
        </Heading.h2>
        <Box pt={1} pb={2}>
          <Breadcrumbs>
            <LocalLink to="/">Lovely Webapp</LocalLink>
            <LocalLink to="/tour">Tour</LocalLink>
            <Text>Images</Text>
          </Breadcrumbs>
        </Box>
        <Lead py={2}>
          The stack supports rendering of static assets like images. Both, the
          server and the client, know how to find assets processed with webpack.
        </Lead>
        <Measure ml={[0, 3]}>
          <Card my={[2, 3]} p={3}>
            <Image mx="auto" src={partyParrotUrl} alt="party-parrot" />
          </Card>
        </Measure>
        <Subhead pt={2} pb={1}>
          Why are images a big deal?
        </Subhead>
        <Text py={1}>
          Since both, the client and the server, can be asked to render any
          page, both need to know about the location of assets. This has
          traditionally been hard to combine with assets generated on
          build-time.
        </Text>
        <Subhead pt={2} pb={1}>
          Working proof
        </Subhead>
        <Text py={1}>
          You can see that images are rendered no matter whether the page is
          rendered on the server or on the client. To try this out, reload this
          page entirely and inspect the source code. You&#39;ll notice that the
          server provides the full URL to the party parrot image above.
        </Text>
        <Text py={1}>
          Now try navigating to another section and then use the browser&#39;s
          &quot;back&quot; button. This time the page will have been rendered by
          your browser - and the image is still there, with the same URL.
        </Text>
        <Subhead pt={2} pb={1}>
          Got it, cool
        </Subhead>
        <Text py={1}>
          Images are only one example of static assets. The same would work for
          videos and other files.
        </Text>
      </Layout>
    );
  }
}
