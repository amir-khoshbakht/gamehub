import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Expose, Type } from 'class-transformer';

@ObjectType()
export class Screenshot {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  image?: string;

}

@ObjectType()
export class RawgScreenshotResponse {
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

  @Type(() => Screenshot)
  @Field(() => [Screenshot])
  results: Screenshot[];
}
