import {Component} from '@angular/core';
import {LocalStorageService} from "./services/LocalStorage/local-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'small-ads-frontend';

  constructor(private localStore: LocalStorageService) {
    this.localStore.saveData('auth', {
      "id": 123,
      "login": "brice.mabillard",
      "role": "WORKER_USER",
      "isLoggedIn": true
    });
  }
}
