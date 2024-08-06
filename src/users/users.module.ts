import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserSchema } from './entities/user.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleResolver } from '@/role/role.resolver';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User]),
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: 60,
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersResolver, UsersService, RoleResolver],
})
export class UsersModule {}
