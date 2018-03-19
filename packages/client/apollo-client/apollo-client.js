import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';

// taken from
// - https://github.com/apollographql/GitHunt-React/blob/master/src/links.js
// - https://www.apollographql.com/docs/react/features/error-handling.html
const errorLink = onError(({ graphQLErrors, networkError }) => {
  // onError receives a callback in the event a GraphQL or network error occurs.
  // This example is a bit contrived, but in the real world, you could connect
  // a logging service to the errorLink or perform a specific action in response
  // to an error.
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      // eslint-disable-next-line no-console
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  // eslint-disable-next-line no-console
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    new HttpLink({ uri: process.env.GRAPHQL_ENDPOINT }),
  ]),
  connectToDevTools: DEV,
  cache: new InMemoryCache().restore(window.APOLLO_STATE),
});
