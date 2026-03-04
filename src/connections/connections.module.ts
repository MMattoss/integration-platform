import { Module } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { ThirdPartySystemsService } from './thirdPartySystem.service';

@Module({
  providers: [ConnectionsService, ThirdPartySystemsService],
  exports: [ConnectionsService, ThirdPartySystemsService],
})
export class ConnectionsModule {}
