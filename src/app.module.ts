import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import Organization from './organizations/entities/organization.entity';
import OrganizationUser from './organizations/entities/organization-users.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConnectionsModule } from './connections/connections.module';
import { Connection } from './connections/entities/connection.entity';
import { ThirdPartySystem } from './connections/entities/thirdPartySystem.entity';
import { ExecutionsModule } from './executions/executions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      entities: [
        User, 
        Organization,
        OrganizationUser,
        Connection,
        ThirdPartySystem,
      ],
      synchronize: true,
    }),
    JwtModule,
    AuthModule,
    UsersModule,
    OrganizationsModule,
    ConnectionsModule,
    ExecutionsModule,
    ExecutionsModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
