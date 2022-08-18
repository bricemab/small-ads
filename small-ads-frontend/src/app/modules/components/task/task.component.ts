import { Component, OnInit } from '@angular/core';
import { Task } from "../../../types/Task";
import { TaskService } from '../../../services/Task/task.service';
import {LocalStorageService} from "../../../services/LocalStorage/local-storage.service";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  tasks: Task[] = [];
  constructor(private taskService: TaskService, private localStore: LocalStorageService) { }

  ngOnInit(): void {
    this.getTask();
  }

  getTask(): void {
    this.taskService.getTasks()
        .subscribe(tasks => this.tasks = tasks);
  }
}
