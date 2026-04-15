import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from './entities/connection.entity';
import { Repository } from 'typeorm';
import { CreateConnectionDto } from './dtos/createConnection.dto';
import { UpdateConnectionDto } from './dtos/updateConnection.dto';
import { EncryptionService } from 'src/encryption/encryption.service';

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection)
    private connectionsRepo: Repository<Connection>,
    private encryptionService: EncryptionService,
  ) {}

  async create(dto: CreateConnectionDto) {
    const {
      name,
      organizationId,
      thirdPartySystemId,
      credentials,
      expiresAt,
    } = dto;
    
    const credentialsEncrypted = await this.encryptionService.encrypt(JSON.stringify(credentials));
    const connection = this.connectionsRepo.create({
      name,
      organizationId,
      thirdPartySystemId,
      credentialsEncrypted,
      expiresAt,
    });

    return this.connectionsRepo.save(connection);
  }

  async findOne(id: string) {
    const connection = await this.connectionsRepo.findOne({ where: { id } });

    if (!connection) {
      throw new NotFoundException('Connection not found');
    }

    return connection;
  }

  async update(id: string, dto: UpdateConnectionDto) {
    const connection = await this.findOne(id);

    if (!connection) {
      throw new NotFoundException('Connection not found');
    }

    Object.assign(connection, dto);

    return this.connectionsRepo.save(connection);
  }

  async delete(id: string) {
    const result = await this.connectionsRepo.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('Connection not found');
    }
  }
}
