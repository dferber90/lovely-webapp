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
      </Layout>
    );
  }
}
