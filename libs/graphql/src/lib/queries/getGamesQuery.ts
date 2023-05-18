import { gql } from '@apollo/client';
import { gameFragment, genreFragment } from './fragments';

export const GET_GAMES = gql`
  ${gameFragment}
  ${genreFragment}
  query GET_GAMES($pageSize: Int, $ordering: String, $search: String) {
    getGames(pageSize: $pageSize, ordering: $ordering, search: $search) {
      count
      nextPage
      results {
        ...GameFields
        genres {
          ...GenreFields
        }
      }
    }
  }
`;
