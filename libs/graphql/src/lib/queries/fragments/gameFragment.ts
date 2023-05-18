import { gql } from '@apollo/client';
import { platformFragment } from './platformFragment';

export const gameFragment = gql`
  ${platformFragment}
  fragment GameFields on Game {
    id
    name
    backgroundImage
    thumbnailImage
    metacritic
    parentPlatforms {
      ...PlatformFields
    }
  }
`;
