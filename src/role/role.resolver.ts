import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Roles } from './entities/role.entity';

@Resolver((of) => Roles)
export class RoleResolver {
  constructor(private readonly userService: UsersService) {}

  @ResolveField((of) => [User])
  public users(@Parent() role: Roles): Promise<User[]> {
    return this.userService.getRole(role.code);
  }
}
