import { PartialType } from "@nestjs/mapped-types";
import { CreateConnectionDto } from "./createConnection.dto";

export class UpdateConnectionDto extends PartialType(CreateConnectionDto) {}