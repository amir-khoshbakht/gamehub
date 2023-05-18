import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';

@ObjectType()
export class Genre {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  slug?: string;

  @Expose({ name: 'games_count' })
  @Field(() => Int)
  gamesCount?: number;

  @Expose({ name: 'image_background' })
  @Field({ nullable: true })
  imageBackground?: string;

  @Field({ nullable: true })
  get thumbnailImage(): string {
    const thumbnailImageUrl =
      this.imageBackground?.replace('/media/', '/media/crop/600/400/') || '';
    return thumbnailImageUrl;
  }

  @Type(() => GenreGame)
  @Field(() => [GenreGame])
  games: GenreGame[];
}

@ObjectType()
export class GenreGame {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name: string;
}
