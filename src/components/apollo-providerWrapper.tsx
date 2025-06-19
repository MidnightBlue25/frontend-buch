'use client';

import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';

export default function ApolloProviderWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
