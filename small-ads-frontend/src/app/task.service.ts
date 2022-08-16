import { Injectable } from '@angular/core';

import { Task } from './task';
import { TASKS } from './mock-tasks';

import { Observable, of  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor() { }

  getTasks(): Observable<Task[]> {
    const heroes = of(TASKS);
    return heroes;
  }

  getTask(id: number): Observable<Task> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const task = TASKS.find(t => t.id === id)!;
    return of(task);
  }
}
