import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@ObjectType()
export class PlatformDetails {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;
}

@ObjectType()
export class Platform {
  @Type(() => PlatformDetails)
  @Field(() => PlatformDetails)
  platform: PlatformDetails;
}
