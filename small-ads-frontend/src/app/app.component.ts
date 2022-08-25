import { Component } from '@angular/core';
import { LocalStorageService } from './services/LocalStorage/local-storage.service';
import { AlertService } from './services/Alert';
import Utils from './utils/Utils';
import Global from './utils/Global';
import { ApplicationResponse, ClientErrors } from './types/GlobalType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'small-ads-frontend';
  options = {
    autoClose: false,
    keepAfterRouteChange: true,
    time: 1000
  };

  constructor(
    private localStore: LocalStorageService,
    protected alertService: AlertService
  ) {
    Global.instanceAxios.interceptors.response.use(
      response => response,
      function(err) {
        const error = err.response;

        if (!error) {
          Utils.handleApplicationError(alertService, {
            code: ClientErrors.AXIOS_NO_RESPONSE,
            message: "The server could'nt be reached"
          });
        } else {
          const responseData: ApplicationResponse<any> = error.data;

          if (error.status !== 200 || !responseData.success) {
            if (responseData.error) {
              Utils.handleApplicationError(alertService, responseData.error);
            }
          }

          if (
            error.status === 401 &&
            error.config &&
            !error.config.__isRetryRequest
          ) {
            Utils.alertError(alertService, 'Disconnected auto 401');
            alert('Faire une deconnexion');
            return;
          }

          if (
            error.status === 403 &&
            error.config &&
            !error.config.__isRetryRequest
          ) {
            Utils.alertError(alertService, 'auto 403');
          }
        }
        return error;
      }
    );
    this.localStore.init();
    // this.localStore.saveData('auth', {
    //   "id": 123,
    //   "login": "brice.mabillard",
    //   "role": "WORKER_USER",
    //   "isLoggedIn": true
    // });
  }
}
