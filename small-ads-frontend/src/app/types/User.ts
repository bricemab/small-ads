import { Moment } from 'moment';
import { Roles } from '../roles';

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  role: Roles;
  registerDate: Moment;
  lastModificationDate: Moment;
  archived: boolean;
}
