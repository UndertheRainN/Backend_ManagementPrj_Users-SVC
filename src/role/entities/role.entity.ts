import { Directive, ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType('Roles')
@Directive('@extends')
@Directive('@key(fields: "code")')
export class Roles {
  @Field(() => ID)
  @Directive('@external')
  code: string;
  @Field((type) => [User])
  users?: User[];
}
