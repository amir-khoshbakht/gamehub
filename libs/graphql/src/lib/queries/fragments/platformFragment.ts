import { gql } from '@apollo/client';

export const platformFragment = gql`
  fragment PlatformFields on Platform {
    platform {
      id
      name
    }
  }
`;
