import { CredentialsType } from "../interfaces/connections.interface";

export class CreateConnectionDto {
  organizationId: string;
  thirdPartySystemId: string;
  name: string;
  credentials: CredentialsType;
  expiresAt: Date;
}
