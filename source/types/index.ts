import { Request, Response } from "express";
import { Send } from "express-serve-static-core";
import { JwtPayload as _JwtPayload } from "jsonwebtoken";

import { UserType } from "./schemas/User";

export interface JwtPayload extends _JwtPayload {
  sub: string;
  iat: number;
}

export interface RequestWithUser extends Request {
  user?: UserType;
}

export interface JsonResponse {
  success: boolean;
  message?: string;
  data?: object | [] | null;
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}
