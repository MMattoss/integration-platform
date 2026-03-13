import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Post } from '@nestjs/common';
import { Queue } from 'bullmq';

@Controller('worker')
export class WorkerController {
  constructor(
    @InjectQueue('workflow-execution') private workflowQueue: Queue,
  ) {}

  @Post('workflow-execution')
  async startWorkflow(
    @Body() workflowId: string,
  ) {
    await this.workflowQueue.add('workflow-execution', workflowId );

    return {
      message: 'Workflow executing'
    }      
  }
}
