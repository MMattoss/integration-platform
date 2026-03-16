import { Module } from '@nestjs/common';
import { ExecutionStepsService } from './executions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExecutionStep } from './entities/executionStep.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExecutionStep]),
  ],
  providers: [ExecutionStepsService],
  exports: [ExecutionStepsService],
})
export class ExecutionsModule {}
