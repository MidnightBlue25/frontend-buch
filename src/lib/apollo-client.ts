// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'https://localhost:3000/graphql',
});

// Automatisch das Token an den Request-Header anhängen
const authLink = setContext((_, { headers }) => {
    if (typeof window === 'undefined') return { headers };

    const token = localStorage.getItem('access_token'); // Lese das Token, das beim Login gespeichert wurde

    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
