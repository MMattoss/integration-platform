import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerController } from './worker.controller';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'workflow',
    }),
  ],
  providers: [WorkerService],
  controllers: [WorkerController]
})
export class WorkerModule {}
