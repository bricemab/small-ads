import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService } from '../../../services/Task/task.service';
import { Task } from '../../../types/Task';
import {
  faAngleLeft,
  faPaperPlane,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task?: Task;
  faAngleLeft = faAngleLeft;
  faPaperPlane = faPaperPlane;
  faLocationDot = faLocationDot;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private location: Location
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getTask();
    console.log(this.task);
  }
  async getTask(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const t = await this.taskService.getTask(id);
    t.subscribe(task => (this.task = task));
  }
}
