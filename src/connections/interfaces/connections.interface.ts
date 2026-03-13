import { AuthType } from "../enums/connections.enum";

export type CredentialsType =
  | {
      type: AuthType.API_KEY;
      apiKey: string;
    }
  | {
      type: AuthType.OAUTH2;
      accessToken: string;
      refreshToken: string;
      expiresAt: Date;
    }
  | {
      type: AuthType.BASIC;
      username: string;
      password: string;
    }
  | {
      type: AuthType.NONE;
    };
