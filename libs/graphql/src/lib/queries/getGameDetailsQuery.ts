import { gql } from '@apollo/client';
import {
  esrbFragment,
  gameFragment,
  genreFragment,
  screenshotFragment,
} from './fragments';

export const GET_GAME_DETAILS = gql`
  ${gameFragment}
  ${esrbFragment}
  ${screenshotFragment}
  ${genreFragment}
  query GET_GAME_DETAILS($id: Int!) {
    gameDetails(id: $id) {
      ...GameFields
      thumbnailImageAdditional
      description
      esrbRating {
        ...EsrbFields
      }
      screenshots {
        ...ScreenshotFields
      }
      genres {
        ...GenreFields
        slug
      }
    }
  }
`;
