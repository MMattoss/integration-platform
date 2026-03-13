import { Module } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { WorkflowRunService } from './workflowRun.service';
import { WorkflowStepService } from './workflowStep.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { WorkflowStep } from './entities/workflowStep.entity';
import { WorkflowRun } from './entities/workflowRun.entity';
import { WorkflowsController } from './workflows.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workflow, WorkflowStep, WorkflowRun]),
  ],
  providers: [WorkflowsService, WorkflowRunService, WorkflowStepService],
  exports: [WorkflowsService, WorkflowRunService, WorkflowStepService],
  controllers: [WorkflowsController],
})
export class WorkflowsModule {}
