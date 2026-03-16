import { PartialType } from "@nestjs/mapped-types";
import { CreateThirdPartySystemDto } from "./createThirdPartySystem.dto";

export class UpdateThirdPartySystemDto extends PartialType(CreateThirdPartySystemDto) {}