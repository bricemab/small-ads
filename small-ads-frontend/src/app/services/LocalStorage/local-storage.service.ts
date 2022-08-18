import { Injectable } from '@angular/core';
import Utils from "../../utils/Utils";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public saveData(key: string, value: string | object) {
    localStorage.setItem(key, Utils.encrypt(JSON.stringify(value)));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key)|| "";
    if (data === "") {
      return false;
    }
    return JSON.parse(Utils.decrypt(data));
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

}
