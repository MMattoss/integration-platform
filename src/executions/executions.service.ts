import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExecutionStep } from './entities/executionStep.entity'; 
import { CreateExecutionStepDto } from './dtos/createExecutionStep.dto'; 
import { UpdateExecutionStepDto } from './dtos/updateExecutionStep.dto'; 

@Injectable()
export class ExecutionStepService {
  constructor(
    @InjectRepository(ExecutionStep)
    private readonly repo: Repository<ExecutionStep>,
  ) {}

  async create(dto: CreateExecutionStepDto): Promise<ExecutionStep> {
    const step = this.repo.create({
      workflowRunId: dto.workflowRunId,
      workflowStepId: dto.workflowStepId,
      status: dto.status,
      startedAt: dto.startedAt,
      input: dto.input,
      output: dto.output,
    });
    return this.repo.save(step);
  }

  async update(id: string, dto: UpdateExecutionStepDto): Promise<ExecutionStep> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async findOne(id: string): Promise<ExecutionStep> {
    const step = await this.repo.findOne({ where: { id } });
    if (!step) throw new NotFoundException(`ExecutionStep ${id} not found`);
    return step;
  }

  async findAllByWorkflowRunId(workflowRunId: string): Promise<ExecutionStep[]> {
    return this.repo.find({
      where: { workflowRunId },
      order: { startedAt: 'ASC' },
    });
  }
}