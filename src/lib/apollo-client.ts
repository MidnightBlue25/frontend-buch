// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://localhost:3000/graphql', // ✅ 改为你的后端地址
});

// 自动附加 token 到请求头
const authLink = setContext((_, { headers }) => {
  if (typeof window === 'undefined') return { headers }; // SSR 时跳过

  const token = localStorage.getItem('access_token'); // ✅ 读取登录时保存的 token

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
