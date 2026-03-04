export interface CreateConnectionDto {
  organizationId: string;
  thirdPartySystemId: string;
  name: string;
  credentialsEncrypted: string;
  expiresAt: Date;
}
