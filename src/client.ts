import { ApolloClient, InMemoryCache } from '@apollo/client';
import { backendUrl } from './configs';

export const client = new ApolloClient({
  uri: backendUrl,
  cache: new InMemoryCache(),
});
