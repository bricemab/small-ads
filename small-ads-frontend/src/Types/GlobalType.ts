import {
  AuthenticationErrors,
  DistributionErrors,
  GeneralErrors,
  GroupErrors,
  ResourceErrors,
  UserErrors,
} from "@/Types/BackendErrors";
import { UserType } from "@/Types/UserType";

export interface ApplicationResponse<DataType> {
  success: boolean;
  data?: DataType;
  error?: ApplicationError;
}

export interface FieldErrorData<FieldType> {
  field: FieldType;
  errors: FieldErrorEnum[];
  emails?: any[];
}

export enum FieldErrorEnum {
  IsNotEmpty = "isNotEmpty",
  IsString = "isString",
  HasValidDn = "HasValidDn",
  IsDnAvailable = "IsDnAvailable",
  IsValidDn = "IsValidDn",
  IsDate = "isDate",
  HasValidSiteLanguage = "HasValidSiteLanguage",
  IsValidSiteKey = "IsValidSiteKey",
  IsBoolean = "isBoolean",
  IsUpnValid = "IsUpnValid",
  IsUpnAvailable = "IsUpnAvailable",
  IsEmail = "isEmail",
  HasValidSiteExtension = "HasValidSiteExtension",
  IsEmailAvailable = "IsEmailAvailable",
  IsSameAccountNameAvailable = "IsSameAccountNameAvailable",
  IsSamAccountValid = "IsSamAccountValid",
  IsArray = "isArray",
  IsPasswordEnoughComplex = "IsPasswordEnoughComplex",
  maxLength = "maxLength",
  UserIsSamAccountValid = "UserIsSamAccountValid",
  UserIsSamAccountNameAvailable = "UserIsSamAccountNameAvailable",
}

export enum ClientErrors {
  AXIOS_NO_RESPONSE = "AXIOS_NO_RESPONSE",
  BACKEND_ERROR = "BACKEND_ERROR",
  BACKEND_NOT_RESPONDING = "BACKEND_NOT_RESPONDING",
  BACKEND_GENERAL_ERROR = "BACKEND_GENERAL_ERROR",
  PROXY_UNKNOWN_ERROR = "PROXY_UNKNOWN_ERROR",
}

export type ApplicationErrorType =
  | ClientErrors
  | GeneralErrors
  | UserErrors
  | AuthenticationErrors
  | DistributionErrors
  | GroupErrors
  | ResourceErrors;

export interface ApplicationError {
  code: ApplicationErrorType;
  message: string;
  details?: any;
}

export interface ApplicationDecryptedToken {
  currentUser: UserType;
  token: string;
}
export interface UserProvisionalEntity {}

export interface ApplicationImportData {
  users: UserProvisionalEntity[];
  groups: {
    system: any[];
    site: any[];
  };
}

export enum UserImportState {
  IMPORTED_SUCCESSFULLY = "IMPORTED_SUCCESSFULLY",
  HAS_ERRORS = "HAS_ERRORS",
  READY_TO_IMPORT = "READY_TO_IMPORT",
  NEED_VERIFY = "NEED_VERIFY",
}

export enum AvailableState {
  NEED_CHECK = "NEED_CHECK",
  AVAILABLE = "AVAILABLE",
  NOT_AVAILABLE = "NOT_AVAILABLE",
}

export enum ValidationState {
  NEED_CHECK = "NEED_CHECK",
  IS_VALID = "IS_VALID",
  IS_NOT_VALID = "IS_NOT_VALID",
}
