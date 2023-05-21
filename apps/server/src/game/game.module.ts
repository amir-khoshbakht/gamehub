import * as Joi from 'joi';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NODE_ENV } from '../constants';

export const RAWG_API_HOST = 'RAWG_API_HOST';
export const RAWG_API_KEY = 'RAWG_API_KEY';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid(...Object.values(NODE_ENV))
          .default(NODE_ENV.DEVELOPMENT),
        RAWG_API_HOST: Joi.string().required(),
        RAWG_API_KEY: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  providers: [ConfigService, GameResolver, GameService],
})
export class GameModule {}
