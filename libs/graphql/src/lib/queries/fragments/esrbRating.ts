import { gql } from '@apollo/client';

export const esrbFragment = gql`
  fragment EsrbFields on EsrbRating {
    id
    name
  }
`;
