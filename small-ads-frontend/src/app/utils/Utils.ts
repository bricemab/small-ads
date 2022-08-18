import Config from "../config/config";
import  *  as CryptoJS from  'crypto-js';
import {LocalStorageService} from "../services/LocalStorage/local-storage.service";
import {ActivatedRouteSnapshot} from "@angular/router";
import AclManager from "../AclManager";

export default class Utils {
  public static async createTimeOutPromise(delayMs: number) {
    return new Promise(resolve => {
      setTimeout(() => resolve("timeout"), delayMs);
    });
  }

  public static encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, Utils.getConfig().dataSecretKey).toString();
  }

  public static decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, Utils.getConfig().dataSecretKey).toString(CryptoJS.enc.Utf8);
  }

  public static hasPermission(permission: string, localStore: LocalStorageService) {
    return AclManager.hasUserAccessToPermission(permission, localStore).isAllowed;
  }

  public static getConfig() {
    return Config;
  }
}
