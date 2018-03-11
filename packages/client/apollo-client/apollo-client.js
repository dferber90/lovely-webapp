import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: process.env.GRAPHQL_ENDPOINT }),
  connectToDevTools: process.env.NODE_ENV !== 'production',
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});
