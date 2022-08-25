import {
  AuthenticationErrors,
  GeneralErrors,
  TaskErrors,
  UserErrors
} from './BackendErrors';

export interface ApplicationResponse<DataType> {
  success: boolean;
  data?: DataType;
  error?: ApplicationError;
}

export enum ClientErrors {
  AXIOS_NO_RESPONSE = 'AXIOS_NO_RESPONSE',
  BACKEND_ERROR = 'BACKEND_ERROR',
  BACKEND_NOT_RESPONDING = 'BACKEND_NOT_RESPONDING',
  BACKEND_GENERAL_ERROR = 'BACKEND_GENERAL_ERROR',
  PROXY_UNKNOWN_ERROR = 'PROXY_UNKNOWN_ERROR'
}

export type ApplicationErrorType =
  | ClientErrors
  | GeneralErrors
  | UserErrors
  | TaskErrors
  | AuthenticationErrors;

export interface ApplicationError {
  code: ApplicationErrorType;
  message: string;
  details?: any;
}
