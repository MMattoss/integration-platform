import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventLog } from "./entities/eventLog.entity";
import { Repository } from "typeorm";
import { ExecutionStep } from "./entities/executionStep.entity";
import { CreateEventLogDto } from "./dtos/createEventLog.dto";

@Injectable()
export class EventLogService {
  constructor(
    @InjectRepository(EventLog)
    private readonly repo: Repository<EventLog>,
  ) {}

  async create(dto: CreateEventLogDto){
    const log = this.repo.create(dto);
    return this.repo.save(log);
  }

  async findAllByExecutionStepId(executionStepId: string): Promise<EventLog[]> {
    return this.repo.find({
      where: { executionStepId },
      order: { createdAt: 'ASC' },
    });
  }

  async findAllByWorkflowRunId(workflowRunId: string): Promise<EventLog[]> {
    return this.repo
      .createQueryBuilder('log')
      .innerJoin(ExecutionStep, 'step', 'step.id = log.executionStepId')
      .where('step.workflowRunId = :workflowRunId', { workflowRunId })
      .orderBy('log.createdAt', 'ASC')
      .getMany();
  }
}