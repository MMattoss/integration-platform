import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { WorkflowStep } from './entities/workflowStep.entity';
import { UpdateWorkflowStepDto } from './dtos/updateWorkflowStep.dto';
import { CreateWorkflowStepDto } from './dtos/createWorkflowStep.dto';

@Injectable()
export class WorkflowStepService {
  constructor(
    @InjectRepository(WorkflowStep)
    private workflowStepsRepo: Repository<WorkflowStep>,
  ) {}

  async create(dto: CreateWorkflowStepDto) {
    const workflowStep = this.workflowStepsRepo.create(
      dto as DeepPartial<WorkflowStep>,
    );
    return this.workflowStepsRepo.save(workflowStep);
  }

  async findAllByWorkflowId(workflowId: string) {
    const workflowStep = await this.workflowStepsRepo.find({
      where: { workflowId },
      order: { order: 'ASC' },
    });

    if(!workflowStep) {
      throw new NotFoundException('Workflow step not found');
    }

    return workflowStep;
  }

  async findOne(id: string) {
    const workflowStep = await this.workflowStepsRepo.findOne({ where: { id } });

    if (!workflowStep) {
      throw new NotFoundException('workflowStep not found');
    }

    return workflowStep;
  }

  async update(id: string, dto: UpdateWorkflowStepDto) {
    const workflowStep = await this.findOne(id);

    if (!workflowStep) {
      throw new NotFoundException('workflowStep not found');
    }

    Object.assign(workflowStep, dto);

    return this.workflowStepsRepo.save(workflowStep);
  }

  async delete(id: string) {
    const result = await this.workflowStepsRepo.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('workflowRun not found');
    }
  }
}
