/* eslint-disable camelcase */
import { UserRole } from "../Users/UserRoles";
import { TaskStatus } from "../Tasks/TaskStatus";

export interface DataBaseUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  role: UserRole;
  register_date: Date;
  last_modification_date: Date;
  archived: boolean;
}
export interface DataBaseTask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  price: number;
  time: string;
  location: string;
  image_id: number;
  user_id: number;
  creation_date: Date;
  last_modification_date: Date;
  archived: boolean;
}
