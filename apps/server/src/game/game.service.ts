import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RAWG_API_HOST, RAWG_API_KEY } from './game.module';
import { map, lastValueFrom } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { makeURL } from '../helpers';
import {
  Game,
  GamesQueryParams,
  GameResponse,
  RawgScreenshotResponse,
} from '@root/data-access';

@Injectable()
export class GameService {
  private readonly apiKey: string;
  private readonly apiHost: string;
  constructor(private client: HttpService, private config: ConfigService) {
    this.apiKey = config.get(RAWG_API_KEY) as string;
    this.apiHost = config.get(RAWG_API_HOST) as string;
  }

  async getGameList(args: GamesQueryParams) {
    const url = makeURL(`${this.apiHost}/games`, args);
    url.searchParams.append('key', this.apiKey);
    const response = this.client
      .get(url.toString())
      .pipe(map((response) => plainToInstance(GameResponse, response.data)));
    return lastValueFrom(response);
  }

  getGameDetails(id: number) {
    const url = makeURL(`${this.apiHost}/games/${id}`);
    url.searchParams.append('key', this.apiKey);
    const response = this.client
      .get(url.toString())
      .pipe(map((response) => plainToInstance(Game, response.data)));
    return lastValueFrom(response);
  }

  getGameScreenshots(id: number, args = {}) {
    const url = makeURL(`${this.apiHost}/games/${id}/screenshots`, args);
    url.searchParams.append('key', this.apiKey);
    const response = this.client
      .get<RawgScreenshotResponse>(url.toString())
      .pipe(
        map((response) =>
          plainToInstance(RawgScreenshotResponse, response.data),
        ),
      );
    return lastValueFrom(response);
  }
}
