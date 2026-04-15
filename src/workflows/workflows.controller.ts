import { Body, Controller, Post } from '@nestjs/common';
import type { CreateWorkflowDto } from './dtos/createWorkflow.dto';
import { WorkflowsService } from './workflows.service';
import { WorkflowStepService } from './workflowStep.service';
import type { CreateWorkflowStepDto } from './dtos/createWorkflowStep.dto';
import { WorkflowRunService } from './workflowRun.service';

@Controller('workflows')
export class WorkflowsController {
  constructor(
    private readonly workflowsService: WorkflowsService,
    private readonly workflowsStepService: WorkflowStepService,
    private readonly workflowRun: WorkflowRunService,
  ) {}

  @Post()
  createWorkflow(
    @Body() dto: CreateWorkflowDto,
  ) {
    return this.workflowsService.create(dto);
  }

  @Post('step')
  createWorkflowStep(
    @Body() dto: CreateWorkflowStepDto,
  ) {
    return this.workflowsStepService.create(dto);
  }
}
