import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StatusEnum, Work } from '../../../interface/work';
import { WorkService } from '../../../service/work.service';
@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss'],
})
export class WorkListComponent implements OnInit {
  public statusEnum = StatusEnum;
  statusTitle!: string;
  statusCount!: number | Work[];
  @Input() statusWork!: StatusEnum;
  @Output() buttonClick = new EventEmitter<Work>();
  isDelete: boolean = false;
  Works = this.workService;
  nowDate = new Date();
  interval!: ReturnType<typeof setInterval>;

  constructor(private workService: WorkService) {}
  ngOnInit() {
    this.workService.getWorkList();
    this.interval = setInterval(() => {
      this.nowDate = new Date();
      switch (this.statusWork) {
        case this.statusEnum.pending:
          return (
            (this.statusTitle = 'Pending'),
            (this.statusCount = this.workService.countWork(
              this.statusEnum.pending
            ))
          );
        case this.statusEnum.working:
          return (
            (this.statusTitle = 'Working'),
            (this.statusCount = this.workService.countWork(
              this.statusEnum.working
            ))
          );
        case this.statusEnum.done:
          return (
            (this.statusTitle = 'Done'),
            (this.statusCount = this.workService.countWork(
              this.statusEnum.done
            ))
          );
        case this.statusEnum.expired:
          return (
            (this.statusTitle = 'Expired'),
            (this.statusCount = this.workService.countWork(
              this.statusEnum.expired
            ))
          );
        default:
          return '';
      }
    }, 1000);
  }

  OnDestroy(): void {
    clearInterval(this.interval);
  }
  editWork(work: Work) {
    this.buttonClick.emit(work);
  }

  openDelete() {
    this.isDelete = !this.isDelete;
  }

  isDeleteChange(isDelete: boolean) {
    this.isDelete = isDelete;
  }
}
