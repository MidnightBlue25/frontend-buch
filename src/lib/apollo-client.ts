// lib/apollo-client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://localhost:3000/graphql', // uri backend
  cache: new InMemoryCache(),
});

export default client;
