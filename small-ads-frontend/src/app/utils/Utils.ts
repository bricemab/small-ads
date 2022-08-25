import Config from '../config/config';
import * as CryptoJS from 'crypto-js';
import { LocalStorageService } from '../services/LocalStorage/local-storage.service';
import AclManager from '../AclManager';
import * as qs from 'qs';
import Global from './Global';
import { AlertService } from '../services/Alert';
import {
  AuthenticationErrors,
  GeneralErrors,
  TaskErrors,
  UserErrors
} from '../types/BackendErrors';
import { ApplicationError, ClientErrors } from '../types/GlobalType';

export default class Utils {
  public static async createTimeOutPromise(delayMs: number) {
    return new Promise(resolve => {
      setTimeout(() => resolve('timeout'), delayMs);
    });
  }

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
        token
      };
      return Global.instanceAxios.post(url, data, config);
    }
  }

  static buildHmacSha256Signature(parameters: Object) {
    const dataQueryString = qs.stringify(parameters); // .replace("%20", "+");
    return CryptoJS.HmacSHA256(
      dataQueryString,
      Utils.getConfig().hmacSecretPacketKey
    ).toString(CryptoJS.enc.Hex);
  }

  public static alertSuccess(
    alertService: AlertService,
    message: string,
    opt: {
      autoClose: boolean;
      keepAfterRouteChange: boolean;
      time: number;
    }
  ) {
    const options = {
      autoClose: opt.autoClose,
      keepAfterRouteChange: opt.keepAfterRouteChange,
      time: opt.time
    };

    alertService.success(message, options);
  }
  public static alertInfo(
    alertService: AlertService,
    message: string,
    opt: {
      autoClose: boolean;
      keepAfterRouteChange: boolean;
      time: number;
    }
  ) {
    const options = {
      autoClose: opt.autoClose,
      keepAfterRouteChange: opt.keepAfterRouteChange,
      time: opt.time
    };

    alertService.info(message, options);
  }

  public static alertError(
    alertService: AlertService,
    message: string,
    opt?: {
      autoClose?: boolean;
      keepAfterRouteChange?: boolean;
      time?: number;
    }
  ) {
    const options = {
      autoClose: opt && opt.hasOwnProperty('autoClose') ? opt.autoClose : false,
      keepAfterRouteChange:
        opt && opt.hasOwnProperty('keepAfterRouteChange')
          ? opt.keepAfterRouteChange
          : true,
      time: opt && opt.hasOwnProperty('time') ? opt.time : 3000
    };

    alertService.error(message, options);
  }
  public static alertWarn(
    alertService: AlertService,
    message: string,
    opt: {
      autoClose: boolean;
      keepAfterRouteChange: boolean;
      time: number;
    }
  ) {
    const options = {
      autoClose: opt.autoClose,
      keepAfterRouteChange: opt.keepAfterRouteChange,
      time: opt.time
    };

    alertService.warn(message, options);
  }

  static handleApplicationError(
    alertService: AlertService,
    error: ApplicationError
  ) {
    let message = null;

    switch (error.code) {
      case ClientErrors.BACKEND_ERROR:
      case ClientErrors.BACKEND_NOT_RESPONDING:
      case ClientErrors.BACKEND_GENERAL_ERROR:
        Utils.handleApplicationError(alertService, error.details.error);
        break;
      case UserErrors.ERROR_WHILE_SEARCHING_USER_IN_DATABASE:
        message = "L'utilisateur n'existe pas";
        break;
      case AuthenticationErrors.AUTH_TOKEN_EXPIRED:
        message = 'Le jeton de connexion a expiré. Veuillez vous reconnecter';
        alert('Faire un logout et rediriger vers login');
        break;
      case AuthenticationErrors.AUTH_NO_ROLE_ALLOWED:
        message = "Vous n'avez pas accès à cette page";
        break;
      case ClientErrors.PROXY_UNKNOWN_ERROR:
        message = 'ApplicationErrorType.PROXY_UNKNOWN_ERROR';
        break;
      case AuthenticationErrors.AUTH_NO_TOKEN_PROVIDED:
        message = 'ApplicationErrorType.AUTH_NO_TOKEN_PROVIDED';
        break;
      case AuthenticationErrors.AUTH_TOKEN_IS_NOT_AUTHENTIC:
        message = 'ApplicationErrorType.AUTH_TOKEN_IS_NOT_AUTHENTIC';
        break;
      case AuthenticationErrors.ACCESS_NOT_AUTHORIZED:
        message = "Vous n'avez pas accès à cette page";
        break;
      case ClientErrors.AXIOS_NO_RESPONSE:
        message = 'Les serveurs sont indisponible';
        break;
      case TaskErrors.ERROR_WHILE_SEARCHING_TASK_IN_DATABASE:
        message = 'Une erreur est survenu lors de la récupération des données';
        break;
      case GeneralErrors.UNHANDLED_ERROR:
      default:
        console.log(error);
        message = 'Une erreur inconnu est survenu';
    }

    if (message) {
      const options = {
        autoClose: false,
        keepAfterRouteChange: true,
        time: 1000
      };
      Utils.alertError(alertService, message, options);
    }
  }

  public static encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(
      txt,
      Utils.getConfig().dataSecretKey
    ).toString();
  }

  public static decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(
      txtToDecrypt,
      Utils.getConfig().dataSecretKey
    ).toString(CryptoJS.enc.Utf8);
  }

  public static hasPermission(
    permission: string,
    localStore: LocalStorageService
  ) {
    return AclManager.hasUserAccessToPermission(permission, localStore)
      .isAllowed;
  }

  public static getConfig() {
    return Config;
  }
  public static convertTime(time: string): string {
    const hours = time.split(':');
    hours.pop();
    return hours.join('H');
  }
}
