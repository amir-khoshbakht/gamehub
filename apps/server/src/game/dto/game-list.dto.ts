import { Field, ArgsType, Int } from '@nestjs/graphql';
import { GamesQueryParams } from '@root/data-access';

@ArgsType()
export class getGamesDto implements GamesQueryParams {
  @Field(() => Int, { defaultValue: 30 })
  pageSize: number;

  @Field(() => String, { nullable: true })
  ordering?: GamesQueryParams['ordering'];

  @Field(() => String, { nullable: true })
  search?: string;
}
