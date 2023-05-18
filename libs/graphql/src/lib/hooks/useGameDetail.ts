import { useQuery } from '@apollo/client';
import { GameDetailsQueryResponse } from '@root/data-access';
import { GET_GAME_DETAILS } from '../queries';

export const useGameDetailQuery = function (id: number) {
  return useQuery<GameDetailsQueryResponse, { id: number }>(GET_GAME_DETAILS, {
    variables: { id },
  });
};
