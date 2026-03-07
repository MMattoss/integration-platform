import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bullmq';

@Controller('worker')
export class WorkerController {
  constructor(
    @InjectQueue('workflow') private workflowQueue: Queue,
  ) {}

  @Post('execute-workflow')
  async startWorkflow(
    @Body() workflowId: string,
  ) {
    await this.workflowQueue.add('execute-workflow', { workflowId });

    return {
      message: 'Workflow executing'
    }
  }
}
