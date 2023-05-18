import { useLazyQuery } from '@apollo/client';

import { GamesQueryParams, GamesQueryResponse } from '@root/data-access';
import { GET_GAMES } from '../queries';

export const useSearchGameQuery = function () {
  return useLazyQuery<GamesQueryResponse, GamesQueryParams>(GET_GAMES);
};
