import { Component } from '@angular/core';
import { Work, StatusEnum } from './interface/work';
import { WorkService } from './service/work.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  showFormWork: boolean = false;
  showFormPlan: boolean = false;

  idEdit: Work = {} as Work;
  public statusEnum = StatusEnum;
  Work = this.workService;
  value!: number;

  constructor(private workService: WorkService) {}

  toggleView(value: number) {
    switch (value) {
      case 1:
        if (this.showFormPlan) {
          this.showFormPlan = !this.showFormPlan;
        }
        this.showFormWork = !this.showFormWork;
        break;
      case 2:
        if (this.showFormWork) {
          this.showFormWork = !this.showFormWork;
        }
        this.showFormPlan = !this.showFormPlan;
        break;
      default:
        break;
    }
  }

  editWork(work: Work) {
    this.toggleView(1);
    this.idEdit = work;
  }
}
