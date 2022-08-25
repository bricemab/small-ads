import { Request } from "express";
import {
  AuthenticationErrors,
  GeneralErrors,
  TaskErrors,
  UserErrors
} from "../modules/Global/BackendErrors";
import { UserRole } from "../modules/Users/UserRoles";

export interface ApplicationError {
  code: GeneralErrors | AuthenticationErrors | UserErrors | TaskErrors;
  message: string;
  details?: any;
}

export type IntranetReject = (error: ApplicationError) => void;

export interface UserSession {
  id: number;
  email: string;
  lastname: string;
  firstname: string;
  role: UserRole;
}

export interface ApplicationUserSessionToken {
  currentUser: UserSession;
  iat: number;
  exp: number;
}

export interface ApplicationRequest<BodyData> extends Request {
  request: UserSession;
  rawToken: string;
  hasValidToken: boolean;
  tokenDecryptedData?: ApplicationUserSessionToken;
  userRole: UserRole;
  body: BodyData;
  headers: {
    "x-access-token": string;
    "x-user-token"?: string;
  };
}

export interface ApplicationResponse<DataType> {
  success: boolean;
  data?: DataType;
  error?: ApplicationError;
}
export type ApplicationResponsePromise<DataType> = Promise<
  ApplicationResponse<DataType>
>;
