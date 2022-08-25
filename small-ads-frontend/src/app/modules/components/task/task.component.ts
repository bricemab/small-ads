import { Component, OnInit } from '@angular/core';
import { Task } from '../../../types/Task';
import { TaskService } from '../../../services/Task/task.service';
import { LocalStorageService } from '../../../services/LocalStorage/local-storage.service';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Utils from '../../../utils/Utils';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  faLocationDot = faLocationDot;

  tasks: Task[] = [];
  constructor(
    private taskService: TaskService,
    private localStore: LocalStorageService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getTask();
  }

  async getTask(): Promise<void> {
    const t = await this.taskService.getTasks();
    t.subscribe(tasks => (this.tasks = tasks));
  }
}
