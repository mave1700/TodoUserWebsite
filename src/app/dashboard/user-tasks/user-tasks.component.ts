import { Component, OnInit, Inject, Input } from '@angular/core';
import { Task } from 'src/app/_interfaces/task.model';

@Component({
  selector: 'app-user-tasks',
  templateUrl: './user-tasks.component.html',
  styleUrls: ['./user-tasks.component.css']
})
export class UserTasksComponent implements OnInit {

  @Input() public tasks: Task[] = [];
  constructor() { }

  ngOnInit() {
  }

}
