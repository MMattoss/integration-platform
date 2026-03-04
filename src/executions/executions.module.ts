import { Module } from '@nestjs/common';
import { ExecutionsService } from './executions.service';

@Module({
  providers: [ExecutionsService]
})
export class ExecutionsModule {}
