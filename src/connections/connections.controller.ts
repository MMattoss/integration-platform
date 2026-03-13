import { Body, Controller, Post } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { ThirdPartySystemsService } from './thirdPartySystem.service';
import type { CreateConnectionDto } from './dtos/createConnection.dto';
import type { CreateThirdPartySystemDto } from './dtos/createThirdPartySystem.dto';

@Controller('connections')
export class ConnectionsController {
  constructor(
    private readonly connectionsService: ConnectionsService,
    private readonly thirdPartySystemService: ThirdPartySystemsService,
  ) {}

  @Post()
  createConnection(
    @Body() dto: CreateConnectionDto,
  ) {
    return this.connectionsService.create(dto);
  }

  @Post('third-party-system')
  createThirdPartySystem(
    @Body() dto: CreateThirdPartySystemDto,
  ) {
    return this.thirdPartySystemService.create(dto);
  }
}
