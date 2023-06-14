import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Work, StatusEnum } from '../interface/work';
import { WorkApiService } from './work-api.service';
@Injectable({
  providedIn: 'root',
})
export class WorkService {
  workList: Work[] = [];
  filterWorkList: Work[] = [];
  statusEnum = StatusEnum;
  isDialog = new BehaviorSubject<boolean>(false);
  currentWork = new BehaviorSubject<Work>({} as Work);

  constructor(private workApi: WorkApiService) {
    this.getWorkList();
  }

  getWorkList() {
    this.workApi.getAllWorks().subscribe((res) => {
      this.workList = Object.assign([], res);
      this.filterWorkList = Object.assign([], res);
    });
  }

  addWork(work: Work) {
    this.workApi.addWork(work).subscribe((res) => {
      this.workList.push(Object.assign(res));
    });
  }

  showWork(): Work[] {
    return this.filterWorkList;
  }

  deleteWork() {
    const id = this.currentWork.value.id;
    this.workList = this.workList.filter((item: Work) => {
      return item.id !== id;
    });
    this.workApi.deleteWork(id).subscribe(() => {});
    this.closeDialog();
  }

  editWork(work: Work) {
    this.workApi.editWork(work).subscribe(() => {
      this.getWorkList();
    });
  }

  filterWork(status: StatusEnum): Work[] {
    switch (status) {
      case this.statusEnum.pending:
        return (this.filterWorkList = this.workList.filter(
          (work) => work.status === this.statusEnum.pending
        ));
      case this.statusEnum.working:
        return (this.filterWorkList = this.workList.filter(
          (work) => work.status === this.statusEnum.working
        ));
      case this.statusEnum.done:
        return (this.filterWorkList = this.workList.filter(
          (work) => work.status === this.statusEnum.done
        ));
      case this.statusEnum.expired:
        return (this.filterWorkList = this.workList.filter(
          (work) => work.status === this.statusEnum.expired
        ));
      default:
        return this.workList;
    }
  }

  countWork(countStatus: StatusEnum) {
    switch (countStatus) {
      case this.statusEnum.pending:
        return this.workList.filter(
          (work) => work.status === this.statusEnum.pending
        ).length;
      case this.statusEnum.working:
        return this.workList.filter(
          (work) => work.status === this.statusEnum.working
        ).length;
      case this.statusEnum.done:
        return this.workList.filter(
          (work) => work.status === this.statusEnum.done
        ).length;
      case this.statusEnum.expired:
        return this.workList.filter(
          (work) => work.status === this.statusEnum.expired
        ).length;
      default:
        return this.workList;
    }
  }

  openDialog(work: Work) {
    this.currentWork.next(work);
    this.isDialog.next(true);
  }
  closeDialog() {
    this.currentWork.next({} as Work);
    this.isDialog.next(false);
  }
}
