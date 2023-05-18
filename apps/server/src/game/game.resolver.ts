import { Game, GameResponse } from '@root/data-access';
import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { GameService } from './game.service';
import { getGamesDto } from './dto';

@Resolver(() => GameResponse)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  /* Get Games list  */
  @Query(() => GameResponse, { name: 'getGames' })
  games(@Args() args: getGamesDto): Promise<GameResponse> {
    return this.gameService.getGameList(args);
  }

  /* Game Details  */
  @Query(() => Game, { name: 'gameDetails' })
  async getGameDetails(
    @Args('id', { type: () => Int }) id?: number,
  ): Promise<Game> {
    const detailPromise = this.gameService.getGameDetails(id);
    const screenshotPromise = await this.gameService.getGameScreenshots(id);
    const details = await detailPromise;
    details.screenshots = screenshotPromise.results;

    return details;
  }
}
