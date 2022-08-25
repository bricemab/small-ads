import { Injectable } from '@angular/core';

import { Task } from '../../types/Task';
import { TASKS } from './mock-tasks';

import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../LocalStorage/local-storage.service';
import Utils from '../../utils/Utils';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public tasks: Task[] = [];

  constructor() {}

  async getTasks(): Promise<Observable<Task[]>> {
    const response = await Utils.postEncodedToBackend('/tasks/list', {});
    const tasks = response.data.data.tasks;
    return of(tasks);
  }

  async getTask(id: number): Promise<Observable<Task>> {
    const response = await Utils.postEncodedToBackend('/tasks/detail', { id });
    const task = response.data.data.task;
    task.time = Utils.convertTime(task.time);
    return of(task);
  }
}
