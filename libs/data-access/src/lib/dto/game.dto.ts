import { Game, GameResponse } from '../entities';

export interface GamesQueryResponse {
  getGames: GameResponse;
}

export interface GamesQueryParams {
  pageSize?: number | null;
  ordering?: 'released' | 'metacritic' | 'popularity' | null;
  search?: string | null;
}

export interface GameDetailsQueryResponse {
  gameDetails: Game;
}
