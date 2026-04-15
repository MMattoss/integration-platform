import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ThirdPartySystem } from "./entities/thirdPartySystem.entity";
import { Repository } from "typeorm";
import { CreateThirdPartySystemDto } from "./dtos/createThirdPartySystem.dto";
import { UpdateThirdPartySystemDto } from "./dtos/updateThirdPartysystem.dto";

@Injectable()
export class ThirdPartySystemsService {
  constructor(
    @InjectRepository(ThirdPartySystem)
    private thirdPartySystemRepo: Repository<ThirdPartySystem>,
  ) {}

  async create(dto: CreateThirdPartySystemDto) {
    const system = this.thirdPartySystemRepo.create(dto);
    return this.thirdPartySystemRepo.save(system);
  }

  async findOne(id: string) {
    const system = await this.thirdPartySystemRepo.findOne({ where: { id } });

    if (!system) {
      throw new NotFoundException('ThirdPartySystem not found');
    }

    return system;
  }

  async update(id: string, dto: UpdateThirdPartySystemDto) {
    const system = await this.findOne(id);

    if (!system) {
      throw new NotFoundException('ThirdPartySystem not found');
    }

    Object.assign(system, dto);

    return this.thirdPartySystemRepo.save(system);
  }

  async delete(id: string) {
    const result = await this.thirdPartySystemRepo.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('ThirdPartySystem not found');
    }
  }
}