import { Field, ObjectType, Float, Int } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';
import { EsrbRating } from './esrb-rating.entity';
import { Genre } from './genre.entity';
import { Platform } from './platform.entity';
import { Screenshot } from './screenshot.entity';

@ObjectType()
export class Game {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Expose({ name: 'description_raw' })
  @Field({ nullable: true })
  description?: string;

  @Expose({ name: 'background_image' })
  @Field({ nullable: true })
  backgroundImage?: string;

  @Expose({ name: 'background_image_additional' })
  @Field({ nullable: true })
  backgroundImageAdditional?: string;

  @Field({ nullable: true })
  get thumbnailImageAdditional(): string {
    return (
      this.backgroundImageAdditional?.replace(
        '/media/',
        '/media/crop/600/400/',
      ) || ''
    );
  }

  @Field({ nullable: true })
  get thumbnailImage(): string {
    const thumbnailImageUrl =
      this.backgroundImage?.replace('/media/', '/media/crop/600/400/') || '';
    return thumbnailImageUrl;
  }

  @Field(() => Int, { nullable: true })
  metacritic: number;

  @Expose({ name: 'esrb_rating' })
  @Field(() => EsrbRating, { nullable: true })
  esrbRating?: EsrbRating;

  @Expose({ name: 'parent_platforms' })
  @Type(() => Platform)
  @Field(() => [Platform], { nullable: true })
  parentPlatforms?: Platform[];

  @Expose({ name: 'genres' })
  @Type(() => Genre)
  @Field(() => [Genre], { nullable: true })
  genres?: Genre[];

  @Type(() => Screenshot)
  @Field(() => [Screenshot], { nullable: true })
  screenshots?: Screenshot[];
}

@ObjectType()
export class GameResponse {
  @Field(() => Int)
  count: number;

  private next?: string;

  @Field(() => Int, { nullable: true })
  @Expose()
  get nextPage(): number | undefined {
    const urlSearchParams = new URLSearchParams(this.next);
    const pageParam = urlSearchParams.get('page');
    const page = pageParam ? parseInt(pageParam) : undefined;
    return page;
  }

  @Type(() => Game)
  @Field(() => [Game])
  results: Game[];
}
