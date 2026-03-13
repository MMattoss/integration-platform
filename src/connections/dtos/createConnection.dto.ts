import { CredentialsType } from "../interfaces/connections.interface";

export interface CreateConnectionDto {
  organizationId: string;
  thirdPartySystemId: string;
  name: string;
  credentials: CredentialsType;
  expiresAt: Date;
}
