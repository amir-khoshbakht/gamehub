// TODO : check

import { from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { getApolloClient } from '@root/graphql';

//TODO : refactor this
const errorLink = onError(({ graphQLErrors, networkError }) => {
  alert('from graphql');
});

//TODO : move this to .env
const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql',
});

export const client = getApolloClient({
  link: from([errorLink, httpLink]),
});
