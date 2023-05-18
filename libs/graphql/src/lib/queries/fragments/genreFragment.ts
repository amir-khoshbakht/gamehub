import { gql } from '@apollo/client';

export const genreFragment = gql`
  fragment GenreFields on Genre {
    id
    name
  }
`;
