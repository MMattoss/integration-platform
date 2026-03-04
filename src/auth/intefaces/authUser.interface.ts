import { Role } from "../enums/organizationRoles.enum";

export interface AuthUser {
  sub: string,
  email: string,
  organizationId: string,
  roles: Role[],
}