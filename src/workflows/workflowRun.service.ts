import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowRun } from './entities/workflowRun.entity';
import { CreateWorkFlowRunDto } from './dtos/createWorkflowRun.dto';
import { UpdateWorkflowRunDto } from './dtos/updateWorkflowRun.dto';

@Injectable()
export class WorkflowRunService {
  constructor(
    @InjectRepository(WorkflowRun)
    private workflowRunsRepo: Repository<WorkflowRun>,
  ) {}

  async create(dto: CreateWorkFlowRunDto) {
    const workflowRun = this.workflowRunsRepo.create(dto);
    return this.workflowRunsRepo.save(workflowRun);
  }

  async findOne(id: string) {
    const workflowRun = await this.workflowRunsRepo.findOne({ where: { id } });

    if (!workflowRun) {
      throw new NotFoundException('workflowRun not found');
    }

    return workflowRun;
  }

  async update(id: string, dto: UpdateWorkflowRunDto) {
    const workflowRun = await this.findOne(id);

    if (!workflowRun) {
      throw new NotFoundException('workflowRun not found');
    }

    Object.assign(workflowRun, dto);

    return this.workflowRunsRepo.save(workflowRun);
  }

  async delete(id: string) {
    const result = await this.workflowRunsRepo.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('workflowRun not found');
    }
  }
}
