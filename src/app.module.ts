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
import { ExecutionStep } from './executions/entities/executionStep.entity';
import { EventLog } from './executions/entities/eventLog.entity';
import { Workflow } from './workflows/entities/workflow.entity';
import { WorkflowRun } from './workflows/entities/workflowRun.entity';
import { WorkflowStep } from './workflows/entities/workflowStep.entity';
import { WorkflowsModule } from './workflows/workflows.module';

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
        ExecutionStep,
        EventLog,
        Workflow,
        WorkflowRun,
        WorkflowStep,
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
    WorkflowsModule,
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
