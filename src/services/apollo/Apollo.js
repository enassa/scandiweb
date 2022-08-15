import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphqlErrors, netWorkErrors }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      console.log(`Graphql error ${message}`);
    });
  }
});

const cache = new InMemoryCache({
  addTypename: false,
  resultCaching: false,
});

const link = from([errorLink, new HttpLink({ uri: "http://localhost:4000/" })]);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "network-only",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "network-only",
    errorPolicy: "all",
  },
};

export const client = new ApolloClient({
  cache: cache,
  link: link,
  defaultOptions,
});
