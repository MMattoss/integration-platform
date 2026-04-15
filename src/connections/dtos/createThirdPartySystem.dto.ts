import { AuthType, ThirdPartyType } from "../enums/connections.enum";

export class CreateThirdPartySystemDto {
  name: string;
  type: ThirdPartyType;
  authType: AuthType;
  baseUrl: string;
}