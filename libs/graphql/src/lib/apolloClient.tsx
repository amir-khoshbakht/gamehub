import {
  ApolloClient,
  ApolloClientOptions,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

const defaultOptions: ApolloClientOptions<NormalizedCacheObject> = {
  cache: new InMemoryCache(),
};

export const getApolloClient = (
  options: Partial<ApolloClientOptions<NormalizedCacheObject>>,
) => {
  return new ApolloClient({
    ...defaultOptions,
    ...options,
  });
};
