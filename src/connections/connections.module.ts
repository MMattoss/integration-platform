import { Module } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { ThirdPartySystemsService } from './thirdPartySystem.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from './entities/connection.entity';
import { ThirdPartySystem } from './entities/thirdPartySystem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Connection, ThirdPartySystem]),
  ],
  providers: [ConnectionsService, ThirdPartySystemsService],
  exports: [ConnectionsService, ThirdPartySystemsService],
})
export class ConnectionsModule {}
