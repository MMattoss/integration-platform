import { PartialType } from '@nestjs/mapped-types';
import { CreateExecutionStepDto } from './createExecutionStep.dto';

export class UpdateExecutionStepDto extends PartialType(CreateExecutionStepDto) {}