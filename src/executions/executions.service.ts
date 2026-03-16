import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { ExecutionStep } from './entities/executionStep.entity'; 
import { CreateExecutionStepDto } from './dtos/createExecutionStep.dto'; 
import { UpdateExecutionStepDto } from './dtos/updateExecutionStep.dto'; 

@Injectable()
export class ExecutionStepsService {
  constructor(
    @InjectRepository(ExecutionStep)
    private executionStepsRepo: Repository<ExecutionStep>,
  ) {}

  async create(dto: CreateExecutionStepDto): Promise<ExecutionStep> {
    const executionStep = this.executionStepsRepo.create(dto);
    return this.executionStepsRepo.save(executionStep);
  }

  async findByWorkflowRun(workflowRunId: string) {
    return this.executionStepsRepo.find({
      where: { workflowRunId },
      order: { startedAt: 'ASC' },
    });
  }

  async findAll(where?: FindOptionsWhere<ExecutionStep>): Promise<ExecutionStep[]> {
    return this.executionStepsRepo.find({
      where,
      order: {
        startedAt: 'ASC',
      },
    });
  }

  async findOneById(id: string): Promise<ExecutionStep> {
    const executionStep = await this.executionStepsRepo.findOne({
      where: { id },
    });

    if (!executionStep) {
      throw new NotFoundException('ExecutionStep not found');
    }

    return executionStep;
  }

  async update(id: string, dto: UpdateExecutionStepDto): Promise<ExecutionStep> {
    const executionStep = await this.findOneById(id);

    Object.assign(executionStep, dto);

    return this.executionStepsRepo.save(executionStep);
  }

  async delete(id: string): Promise<void> {
    const result = await this.executionStepsRepo.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException('ExecutionStep not found');
    }
  }
}