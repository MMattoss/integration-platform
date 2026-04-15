import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { BullModule } from '@nestjs/bullmq';
import { WorkflowWorker } from './workflow.worker';
import { WorkflowsModule } from 'src/workflows/workflows.module';
import { ConnectionsModule } from 'src/connections/connections.module';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'workflow-execution',
    }),
    HttpModule,
    WorkflowsModule,    
    ConnectionsModule,
    EncryptionModule,
  ],
  providers: [WorkerService, WorkflowWorker],
  controllers: [WorkerController]
})
export class WorkerModule {}
