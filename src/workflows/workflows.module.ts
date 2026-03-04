import { Module } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';

@Module({
  providers: [WorkflowsService]
})
export class WorkflowsModule {}
