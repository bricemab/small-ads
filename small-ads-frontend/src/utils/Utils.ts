import { Vue } from "vue/types/vue";
import {
  ApplicationError,
  ClientErrors,
  FieldErrorEnum,
  ValidationState,
} from "@/Types/GlobalType";
import {
  AuthenticationErrors,
  DistributionErrors,
  GeneralErrors,
  ResourceErrors,
  UserErrors,
} from "@/Types/BackendErrors";
// import { GroupField } from "@/Types/UserType";
import { i18n } from "@/locales/i18n";
// @ts-ignore
import crypto from "crypto";
import qs from "qs";
import Global from "@/utils/Global";
import config from "@/config/config";

/**
 * Classe Utils contient :
 * La gestion d'affichage de notifications ou de toasts.
 * La gestion d'erreur pour les champs lors d'un ajout d'utilisateur et leur affichage.
 */
export default class Utils {
  static async postEncodedToBackend(
    url: string,
    params: Object | FormData,
    config?: Object,
    isUploadFile?: boolean
  ) {
    const token = Utils.buildHmacSha256Signature(params);

    if (isUploadFile) {
      return Global.instanceAxios.post(url, params, config);
    } else {
      const data = {
        data: params,
        token,
      };
      return Global.instanceAxios.post(url, data, config);
    }
  }

  static buildHmacSha256Signature(parameters: Object) {
    const dataQueryString = qs.stringify(parameters); // .replace("%20", "+");
    // @ts-ignore
    return crypto
      .createHmac("sha256", config.hmacSecretPacketKey)
      .update(dataQueryString)
      .digest("hex");
  }

  /**
   * Affiche une notification d'avertissement
   * @param vueInstance - Vue dans laquelle la notification doit être affichée.
   * @param message - Message qui doit être affiché.
   * @param timestamp - Temps d'affichage de la notification.
   */
  static notifyWarning(vueInstance: Vue, message: string, timestamp?: number) {
    vueInstance.$buefy.toast.open({
      duration: timestamp || 5000,
      message: message,
      queue: false,
      position: "is-bottom",
      type: "is-warning",
    });
  }
  /**
   * Affiche une erreur dans un toast
   * @param vueInstance - Vue dans laquelle le toast doit être affiché.
   * @param message - Message qui doit être affiché.
   * @param timestamp - Temps d'affichage du toast.
   */
  static toastError(vueInstance: Vue, message: string, timestamp?: number) {
    vueInstance.$buefy.toast.open({
      duration: timestamp || 5000,
      message: message,
      queue: false,
      position: "is-bottom",
      type: "is-danger",
    });
  }
  /**
   * Affiche un message de succès dans un toast
   * @param vueInstance - Vue dans laquelle le toast doit être affiché.
   * @param message - Message qui doit être affiché.
   * @param timestamp - Temps d'affichage du toast.
   */
  static notifySuccess(vueInstance: Vue, message: string, timestamp?: number) {
    vueInstance.$buefy.toast.open({
      duration: timestamp || 5000,
      message: message,
      queue: false,
      position: "is-bottom",
      type: "is-success",
    });
  }
  /**
   * Affiche une notification d'erreur
   * @param vueInstance - Vue dans laquelle la notification doit être affichée.
   * @param message - Message qui doit être affiché.
   * @param timestamp - Temps d'affichage de la notification
   */
  static notifyError(vueInstance: Vue, message: string, timestamp?: number) {
    vueInstance.$buefy.toast.open({
      duration: timestamp || 5000,
      message: message,
      queue: false,
      position: "is-bottom",
      type: "is-danger",
    });
  }
  /**
   * Affiche une notification d'information
   * @param vueInstance - Vue dans laquelle la notification doit être affichée.
   * @param message  - Message qui doit être affiché.
   */
  static notifyInfo(vueInstance: Vue, message: string) {
    vueInstance.$buefy.toast.open({
      duration: 5000,
      message: message,
      queue: false,
      position: "is-bottom",
      type: "is-info",
    });
  }
  /**
   * Affiche une notification de succès
   * @param vueInstance - Vue dans laquelle la notification doit être affichée.
   * @param message - Message qui doit être affiché.
   * @param timestamp - Temps d'affichage de la notification.
   */
  static toastSuccess(vueInstance: Vue, message: string, timestamp?: number) {
    vueInstance.$buefy.toast.open({
      duration: timestamp || 5000,
      message: message,
      queue: false,
      position: "is-bottom",
      type: "is-success",
    });
  }

  /**
   * Gestion des erreurs provenant du proxy ou du backend.
   * @param vueInstance -  Vue dans laquelle l'erreur doit s'afficher.
   * @param error - Erreur renvoyée par le proxy ou le backend.
   */
  static handleApplicationError(vueInstance: Vue, error: ApplicationError) {
    let message = null;
    let type = "is-danger";
    let duration = 7000;

    switch (error.code) {
      case ClientErrors.BACKEND_ERROR:
      case ClientErrors.BACKEND_NOT_RESPONDING:
      case ClientErrors.BACKEND_GENERAL_ERROR:
        Utils.handleApplicationError(vueInstance, error.details.error);
        break;
      case UserErrors.ERROR_WHILE_SEARCHING_USER_IN_DATABASE:
      case AuthenticationErrors.AUTH_INVALID_CREDENTIALS:
        message = i18n.t("userErrors.errorsFromBackend.wrongAccess") as string;
        type = "is-warning";
        break;
      case AuthenticationErrors.AUTH_TOKEN_EXPIRED:
        message = i18n.t(
          "userErrors.errorsFromBackend.expiredSession"
        ) as string;
        type = "is-warning";
        duration = 30000;
        vueInstance.$store.dispatch("logout").then(() => {
          vueInstance.$router.push({ name: "login" }).catch(() => {
            Utils.toastError(
              vueInstance,
              i18n.t("userErrors.disconnectError") as string
            );
          });
        });
        break;
      case AuthenticationErrors.AUTH_ACCESS_TO_INTRANET_NOT_ALLOWED:
        message = i18n.t("userErrors.errorsFromBackend.noAccess") as string;
        type = "is-warning";
        duration = 15000;
        break;
      case AuthenticationErrors.AUTH_DISABLED_ACCOUNT:
        message = i18n.t(
          "userErrors.errorsFromBackend.accountDisabled"
        ) as string;
        type = "is-warning";
        duration = 15000;
        break;
      case AuthenticationErrors.AUTH_NO_ROLE_ALLOWED:
        message = i18n.t(
          "userErrors.errorsFromBackend.noRoleAllowed"
        ) as string;
        type = "is-warning";
        duration = 15000;
        break;
      case ClientErrors.PROXY_UNKNOWN_ERROR:
        message = "ApplicationErrorType.PROXY_UNKNOWN_ERROR";
        break;
      case AuthenticationErrors.AUTH_NO_TOKEN_PROVIDED:
        message = "ApplicationErrorType.AUTH_NO_TOKEN_PROVIDED";
        break;
      case AuthenticationErrors.AUTH_TOKEN_IS_NOT_AUTHENTIC:
        message = "ApplicationErrorType.AUTH_TOKEN_IS_NOT_AUTHENTIC";
        break;
      case AuthenticationErrors.ACCESS_NOT_AUTHORIZED:
        message = i18n.t(
          "userErrors.errorsFromBackend.functionNotAllowed"
        ) as string;
        type = "is-warning";
        duration = 15000;
        break;
      case ClientErrors.AXIOS_NO_RESPONSE:
        message = i18n.t(
          "userErrors.errorsFromBackend.serverNotResponding"
        ) as string;
        break;
      case UserErrors.ERROR_WHILE_SETUP_NEW_PASSWORD:
      case UserErrors.ERROR_WHILE_UPDATING_NEW_PASSWORD:
        message = i18n.t(
          "userErrors.errorsFromBackend.passwordUpdateFailed"
        ) as string;
        break;
      case UserErrors.ERROR_WHILE_CREATING_USER_IN_LDAP:
        duration = 30000;
        message =
          "<p>" +
          i18n.t("userErrors.errorsFromBackend.ldapError") +
          "<ul style='list-style-type: circle; padding-left: 25px'>" +
          "<li>" +
          i18n.t("userErrors.errorsFromBackend.ldapPasswordError") +
          "</li>" +
          "</ul>" +
          i18n.t("userErrors.errorsFromBackend.contactSupport") +
          "</p>";
        break;

      case GeneralErrors.URL_CANT_BE_LOADED:
        message = i18n.t(
          "layoutVSbooks.pages.webTemplates.errors.urlNotFound"
        ) as string;
        break;
      case GeneralErrors.TEMPLATE_PREVIEW_NOT_FOUND:
        message = i18n.t(
          "layoutVSbooks.pages.webTemplates.errors.templatePreview"
        ) as string;
        break;
      case GeneralErrors.CAMPAIGN_NOT_AUTHORIZED:
        message = i18n.t(
          "layoutVSbooks.pages.campaignResult.error.authorized"
        ) as string;
        break;
      //Erreurs traitées dans l'interface directement
      case UserErrors.ERROR_WHILE_VALIDATING_NEW_PASSWORD:
      case UserErrors.ERROR_WHILE_VALIDATING_USER:
      case ResourceErrors.ERROR_WHILE_VALIDATING_RESOURCE:
      case ResourceErrors.ERROR_WHILE_VALIDATING_DATA:
      case ResourceErrors.ERROR_WHILE_SETUP_EDIT_RESOURCE:
      case ResourceErrors.ERROR_WHILE_CREATING_RESOURCE_IN_LDAP:
      case ResourceErrors.ERROR_WHILE_SETUP_DELETE_RESOURCES:
      case DistributionErrors.ERR_INVALID_ARG_TYPE:
      case DistributionErrors.ERROR_WHILE_DELETE_ALL_DISTRIBUTIONS_LDAP:
      case DistributionErrors.ERROR_WHILE_SETUP_DELETE_DISTRIBUTION:
      case DistributionErrors.ERROR_WHILE_DELETE_ONE_DISTRIBUTION_LDAP:
      case DistributionErrors.SEARCH_NO_ITEM_WAS_FOUND:
      case ResourceErrors.ERROR_WHILE_UPDATING_RESOURCE:
        break;

      case GeneralErrors.UNHANDLED_ERROR:
      default:
        message = i18n.t("userErrors.errorsFromBackend.unknownError") as string;
    }

    if (message) {
      vueInstance.$buefy.toast.open({
        duration,
        message: message,
        position: "is-bottom",
        type: type,
        queue: false,
      });
    }
  }

  static ucFirst(string: string) {
    if (!string) {
      return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  static removeUnsupportedCharacters(string: string) {
    if (!string) {
      return string;
    }
    return string
      .normalize("NFD")
      .replace(",", "")
      .replace(/\s/g, "")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  static ucWords(string: string) {
    if (!string) {
      return "";
    }
    return string
      .toLowerCase()
      .replace(/(?<= )[^\s]|^./g, (a) => a.toUpperCase());
  }

  static buildAcronym(firstname: string, lastname: string) {
    const firsNameFirstLetter = firstname[0].charAt(0).toUpperCase();
    const lastNameFirstLetter = lastname.charAt(0).toUpperCase();
    return firsNameFirstLetter + lastNameFirstLetter;
  }
}
