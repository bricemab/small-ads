import {Injectable} from '@angular/core';

import {Task} from '../../types/Task';
import {TASKS} from './mock-tasks';

import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor() { }

  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }

  getTask(id: number): Observable<Task> {
    const task = TASKS.find(t => t.id === id)!;
    return of(task);
  }
}
