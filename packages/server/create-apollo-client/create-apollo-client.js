import fetch from 'node-fetch';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

export const createApolloClient = token => {
  const authLink = new ApolloLink((operation, forward) => {
    if (token) {
      const authorizationHeader = `Bearer ${token}`;
      operation.setContext({
        headers: {
          authorization: authorizationHeader,
        },
      });
    }
    return forward(operation);
  });
  return new ApolloClient({
    ssrMode: true,
    ssrForceFetchDelay: 100,
    link: ApolloLink.from([
      authLink,
      new HttpLink({
        fetch,
        uri: process.env.GRAPHQL_ENDPOINT,
      }),
    ]),
    cache: new InMemoryCache(),
  });
};
