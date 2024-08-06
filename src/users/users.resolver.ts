import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { PaginatedUser, User, UserNotPassword } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PinoLogger } from 'nestjs-pino';
import { FilterUserInputByPage } from './dto/filter-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ACCESS, RolesGuard } from 'src/auth/role.guard';
import { Roles } from '@/role/entities/role.entity';
import { DRoles } from '@/common/role.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(UsersResolver.name);
  }

  @Mutation(() => UserNotPassword)
  // @UseGuards(GqlAuthGuard)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserNotPassword> {
    return this.usersService.create(createUserInput);
  }

  @Query(() => PaginatedUser, { name: 'users' })
  @UseGuards(GqlAuthGuard)
  @DRoles(`${ACCESS.QUERY}_USER`)
  @UseGuards(RolesGuard)
  findAll(
    @Args('filter') filterUserInput: FilterUserInputByPage,
  ): Promise<PaginatedUser> {
    return this.usersService.findAll(filterUserInput);
  }

  @Query(() => User)
  @CacheTTL(50)
  @CacheKey('username')
  findByUserName(@Args('username') username: string) {
    return this.usersService.findByUsername(username);
  }
  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOne(id);
  // }

  @Mutation(() => UserNotPassword)
  @UseGuards(GqlAuthGuard)
  @DRoles(`${ACCESS.UPDATE}_USER`)
  @UseGuards(RolesGuard)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => UserNotPassword)
  @UseGuards(GqlAuthGuard)
  @DRoles(`${ACCESS.DELETE}_USER`)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @ResolveField((of) => Roles)
  role(@Parent() user: User): any {
    return { __typename: 'Role', code: user.roleCode };
  }
}
