export class Alert {
  id: string;
  type: AlertType;
  message: string;
  autoClose: boolean;
  time: number;
  keepAfterRouteChange: boolean;
  fade: boolean;

  constructor(options: {
    id: string;
    type: AlertType;
    message: string;
    autoClose: boolean;
    time: number;
    keepAfterRouteChange: boolean;
    fade: boolean;
  }) {
    this.id = options.id;
    this.type = options.type;
    this.message = options.message;
    this.autoClose = options.autoClose;
    this.time = options.time;
    this.keepAfterRouteChange = options.keepAfterRouteChange;
    this.fade = options.fade;
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
