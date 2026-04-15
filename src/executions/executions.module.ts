import { Module } from '@nestjs/common';
import { ExecutionStepService } from './executions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionStep } from './entities/executionStep.entity';
import { EventLog } from './entities/eventLog.entity';
import { EventLogService } from './eventLog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExecutionStep, EventLog]),
  ],
  providers: [ExecutionStepService, EventLogService],
  exports: [ExecutionStepService, EventLogService],
})
export class ExecutionsModule {}
