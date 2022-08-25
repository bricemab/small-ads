import { Injectable } from '@angular/core';
import Utils from '../../utils/Utils';

const DEFAULT_DATA = {
  role: 'ANONYMOUS_USER',
  isLoggedIn: false
};

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  public init(): object {
    const data = this.getData('auth');
    if (!data) {
      this.saveData('auth', DEFAULT_DATA);
      return DEFAULT_DATA;
    }
    return data;
  }

  public saveData(key: string, value: string | object) {
    localStorage.setItem(key, Utils.encrypt(JSON.stringify(value)));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key) || '';
    if (data === '') {
      return false;
    }
    console.log(JSON.parse(Utils.decrypt(data)));
    return JSON.parse(Utils.decrypt(data));
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
