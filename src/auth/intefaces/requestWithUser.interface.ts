import { Request } from "express";
import { AuthUser } from "./authUser.interface";

export interface RequestWithUser extends Request {
  user: AuthUser;
}