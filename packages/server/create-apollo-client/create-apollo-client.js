import fetch from 'node-fetch';
import ApolloClient from 'apollo-client';
// import { createPersistedQueryLink } from 'apollo-link-persisted-queries';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';

export const createApolloClient = () =>
  new ApolloClient({
    ssrMode: true,
    ssrForceFetchDelay: 100,
    link: new HttpLink({
      fetch,
      uri: process.env.GRAPHQL_ENDPOINT,
    }),
    cache: new InMemoryCache(),
  });
