import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Organization from './entities/organization.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepo: Repository<Organization>,
  ) {}

  async create(name: string) {
    const organization = this.organizationRepo.create({ name: `${name}'s Organization` });
    const result = await this.organizationRepo.save(organization);

    return result;
  }
}
