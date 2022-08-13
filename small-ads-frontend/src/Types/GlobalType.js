export var FieldErrorEnum;
(function (FieldErrorEnum) {
  FieldErrorEnum["IsNotEmpty"] = "isNotEmpty";
  FieldErrorEnum["IsString"] = "isString";
  FieldErrorEnum["HasValidDn"] = "HasValidDn";
  FieldErrorEnum["IsDnAvailable"] = "IsDnAvailable";
  FieldErrorEnum["IsValidDn"] = "IsValidDn";
  FieldErrorEnum["IsDate"] = "isDate";
  FieldErrorEnum["HasValidSiteLanguage"] = "HasValidSiteLanguage";
  FieldErrorEnum["IsValidSiteKey"] = "IsValidSiteKey";
  FieldErrorEnum["IsBoolean"] = "isBoolean";
  FieldErrorEnum["IsUpnValid"] = "IsUpnValid";
  FieldErrorEnum["IsUpnAvailable"] = "IsUpnAvailable";
  FieldErrorEnum["IsEmail"] = "isEmail";
  FieldErrorEnum["HasValidSiteExtension"] = "HasValidSiteExtension";
  FieldErrorEnum["IsEmailAvailable"] = "IsEmailAvailable";
  FieldErrorEnum["IsSameAccountNameAvailable"] = "IsSameAccountNameAvailable";
  FieldErrorEnum["IsSamAccountValid"] = "IsSamAccountValid";
  FieldErrorEnum["IsArray"] = "isArray";
  FieldErrorEnum["IsPasswordEnoughComplex"] = "IsPasswordEnoughComplex";
  FieldErrorEnum["maxLength"] = "maxLength";
  FieldErrorEnum["UserIsSamAccountValid"] = "UserIsSamAccountValid";
  FieldErrorEnum["UserIsSamAccountNameAvailable"] =
    "UserIsSamAccountNameAvailable";
})(FieldErrorEnum || (FieldErrorEnum = {}));
export var ClientErrors;
(function (ClientErrors) {
  ClientErrors["AXIOS_NO_RESPONSE"] = "AXIOS_NO_RESPONSE";
  ClientErrors["BACKEND_ERROR"] = "BACKEND_ERROR";
  ClientErrors["BACKEND_NOT_RESPONDING"] = "BACKEND_NOT_RESPONDING";
  ClientErrors["BACKEND_GENERAL_ERROR"] = "BACKEND_GENERAL_ERROR";
  ClientErrors["PROXY_UNKNOWN_ERROR"] = "PROXY_UNKNOWN_ERROR";
})(ClientErrors || (ClientErrors = {}));
export var UserImportState;
(function (UserImportState) {
  UserImportState["IMPORTED_SUCCESSFULLY"] = "IMPORTED_SUCCESSFULLY";
  UserImportState["HAS_ERRORS"] = "HAS_ERRORS";
  UserImportState["READY_TO_IMPORT"] = "READY_TO_IMPORT";
  UserImportState["NEED_VERIFY"] = "NEED_VERIFY";
})(UserImportState || (UserImportState = {}));
export var AvailableState;
(function (AvailableState) {
  AvailableState["NEED_CHECK"] = "NEED_CHECK";
  AvailableState["AVAILABLE"] = "AVAILABLE";
  AvailableState["NOT_AVAILABLE"] = "NOT_AVAILABLE";
})(AvailableState || (AvailableState = {}));
export var ValidationState;
(function (ValidationState) {
  ValidationState["NEED_CHECK"] = "NEED_CHECK";
  ValidationState["IS_VALID"] = "IS_VALID";
  ValidationState["IS_NOT_VALID"] = "IS_NOT_VALID";
})(ValidationState || (ValidationState = {}));
//# sourceMappingURL=GlobalType.js.map
