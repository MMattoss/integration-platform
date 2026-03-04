import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { Repository } from 'typeorm';
import { CreateWorkflowDto } from './dtos/createWorkflow.dto';
import { UpdateWorkflowDto } from './dtos/updateWorkflow.dto';

@Injectable()
export class WorkflowsService {
  constructor(
    @InjectRepository(Workflow)
    private workflowsRepo: Repository<Workflow>,
  ) {}

  async create(dto: CreateWorkflowDto) {
    const workflow = this.workflowsRepo.create(dto);
    return this.workflowsRepo.save(workflow);
  }

  async findOne(id: string) {
    const workflow = await this.workflowsRepo.findOne({ where: { id } });

    if (!workflow) {
      throw new NotFoundException('workflow not found');
    }

    return workflow;
  }

  async update(id: string, dto: UpdateWorkflowDto) {
    const workflow = await this.findOne(id);

    if (!workflow) {
      throw new NotFoundException('workflow not found');
    }

    Object.assign(workflow, dto);

    return this.workflowsRepo.save(workflow);
  }

  async delete(id: string) {
    const result = await this.workflowsRepo.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('workflow not found');
    }
  }
}
