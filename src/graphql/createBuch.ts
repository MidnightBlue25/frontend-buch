// src/graphql/createBuch.ts
import { gql } from '@apollo/client';

export const CREATE_BUCH = gql`
  mutation CreateBuch($input: BuchInput!) {
    create(input: $input) {
      id
    }
  }
`;
