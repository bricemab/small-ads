import { TaskStatus } from './TaskStatus';
import { Moment } from 'moment';
import { User } from './User';

export interface Task {
  id: number;
  title: string;
  description: string;
  price: number;
  time: string;
  location: string;
  imageId: number;
  status: TaskStatus;
  creationDate: Moment;
  lastModificationDate: Moment;
  user: User;
  archived: boolean;
}
