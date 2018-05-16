import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import Cookies from 'cookies-js';

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

const authLink = new ApolloLink((operation, forward) => {
  const token = Cookies.get('authToken');
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

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    new HttpLink({
      uri: window.CONFIG.API_ENDPOINT,
      credentials: 'include',
    }),
  ]),
  connectToDevTools: DEV,
  cache: new InMemoryCache().restore(window.APOLLO_STATE),
});
