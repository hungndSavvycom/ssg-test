import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://13.251.132.216:4100/graphql',
  cache: new InMemoryCache()
});

export default client;
