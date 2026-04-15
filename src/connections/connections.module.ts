import { Module } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { ThirdPartySystemsService } from './thirdPartySystem.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from './entities/connection.entity';
import { ThirdPartySystem } from './entities/thirdPartySystem.entity';
import { EncryptionModule } from 'src/encryption/encryption.module';
import { ConnectionsController } from './connections.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Connection, ThirdPartySystem]),
    EncryptionModule,
  ],
  providers: [ConnectionsService, ThirdPartySystemsService],
  exports: [ConnectionsService, ThirdPartySystemsService],
  controllers: [ConnectionsController],
})
export class ConnectionsModule {}
