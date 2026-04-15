import { PartialType } from "@nestjs/mapped-types";
import { CreateWorkflowStepDto } from "./createWorkflowStep.dto";

export class UpdateWorkflowStepDto extends PartialType(CreateWorkflowStepDto) {}