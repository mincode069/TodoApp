import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Payload } from '../../../interface/payload';
import { StatusEnum, Work } from '../../../interface/work';
import { WorkService } from '../../../service/work.service';
import { oneDay, oneHour } from '../../../constant/constant';
@Component({
  selector: 'app-work-item',
  templateUrl: './work-item.component.html',
  styleUrls: ['./work-item.component.scss'],
})
export class WorkItemComponent implements OnInit {
  color: ThemePalette = 'primary';
  Work = this.workService;
  public statusEnum = StatusEnum;
  isUpdate!: boolean;
  showDayLeft: Boolean = true;
  @Input() work!: Work;
  @Input() isDelete!: boolean;
  @Input() nowDate!: Date;
  @Output() isDeleteChange = new EventEmitter<boolean>();
  @Output() buttonClick = new EventEmitter<Work>();
  payload!: Payload;
  constructor(private workService: WorkService) {}
  ngOnInit() {
    this.isUpdate =
      this.work.status === this.statusEnum.working ||
      this.work.status === this.statusEnum.pending;
  }
  ngOnChanges(): void {
    this.payload = this.countdownTime(this.work.deadline, this.nowDate);
  }

  countdownTime(deadline: Date, currentTime: Date) {
    const deadlineTodo = new Date(deadline).getTime();
    let notification: string = '';
    const dayLeft: number = Math.round(
      (deadlineTodo - currentTime.getTime()) / oneDay
    );
    let percent: number = Math.round(
      ((this.work.intended - dayLeft - 1) / this.work.intended) * 100
    );

    switch (this.work.status) {
      case this.statusEnum.pending:
        percent = 0;
        if (
          deadlineTodo - currentTime.getTime() <
          oneDay * this.work.intended
        ) {
          notification = 'you need to do now';
        }
        break;
      case this.statusEnum.working:
        if (percent > 70) {
          this.color = 'warn';
        }
        if (
          deadlineTodo - currentTime.getTime() <= oneHour &&
          deadlineTodo - currentTime.getTime() > 0
        ) {
          notification = 'you have 1 hour left';
          this.showDayLeft = false;
        }
        break;
      case this.statusEnum.done:
        this.showDayLeft = false;
        percent = 100;
        break;
      case this.statusEnum.expired:
        this.showDayLeft = false;
        percent = 0;
        break;
      default:
        break;
    }

    if (deadlineTodo - currentTime.getTime() < 0) {
      const UpdateWork: Work = this.work;
      if (
        this.work.status === this.statusEnum.pending ||
        this.work.status === this.statusEnum.working
      ) {
        UpdateWork.status = this.statusEnum.expired;
        this.workService.editWork(UpdateWork);
      }
    }

    return {
      notification,
      dayLeft,
      percent,
    };
  }

  editWork(work: Work) {
    this.buttonClick.emit(work);
  }

  updateStatus(work: Work) {
    const updateWork: Work = work;
    if (work.status === this.statusEnum.working) {
      updateWork.status = this.statusEnum.done;
    }
    if (work.status === this.statusEnum.pending) {
      updateWork.status = this.statusEnum.working;
    }
    this.workService.editWork(updateWork);
  }

  deleteWork(work: Work) {
    this.isDeleteChange.emit(!this.isDelete);
    this.workService.openDialog(work);
  }
}
