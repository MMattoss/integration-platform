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
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    OrganizationsModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
