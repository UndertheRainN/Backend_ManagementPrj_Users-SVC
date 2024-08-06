import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Roles } from './role/entities/role.entity';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      inject: [ConfigService],
      driver: ApolloFederationDriver,
      useFactory: (config: ConfigService) => ({
        path: 'users',
        playground: false,
        autoSchemaFile: { federation: 2 },
        definitions: {
          path: join(process.cwd(), 'src/graphql.ts'),
          outputAs: 'interface',
        },
        buildSchemaOptions: {
          orphanedTypes: [Roles],
        },
      }),
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: `${config.get<string>('MONGO_URL')}/${config.get<string>('MONGO_SCHEMA')}`,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
