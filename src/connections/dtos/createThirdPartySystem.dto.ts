import { AuthType, ThirdPartyType } from "../enums/connections.enum";

export interface CreateThirdPartySystemDto {
  name: string;
  type: ThirdPartyType;
  authType: AuthType;
  baseUrl: string;
}