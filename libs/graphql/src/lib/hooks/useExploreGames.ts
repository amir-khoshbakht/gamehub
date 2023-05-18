import { useQuery } from '@apollo/client';
import { GamesQueryParams, GamesQueryResponse } from '@root/data-access';

import { GET_GAMES } from '../queries';

export const useExploreGamesQuery = function (queryParams: any) {
  return useQuery<GamesQueryResponse, GamesQueryParams>(GET_GAMES, {
    variables: queryParams,
  });
};
