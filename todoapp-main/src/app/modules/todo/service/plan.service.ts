import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Plan } from '../interface/plan';
import { PlanApiService } from './plan-api.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  planList: Plan[] = [];
  filterPlanList: Plan[] = [];
  currentPlan = new BehaviorSubject<Plan>({} as Plan);

  constructor(private planApi: PlanApiService) {
    this.getPlanList();
  }

  getPlanList() {
    this.planApi.getAllPlans().subscribe((res) => {
      this.planList = Object.assign([], res);
      this.filterPlanList = Object.assign([], res);
    });
  }

  addPlan(plan: Plan) {
    this.planApi.addPlan(plan).subscribe((res) => {
      this.planList.push(Object.assign(res));
    });
  }

  deletePlan() {
    const id = this.currentPlan.value.id;
    this.planList = this.planList.filter((item: Plan) => {
      return item.id !== id;
    });
    this.planApi.deletePlan(id).subscribe(() => {});
  }

  editPlan(plan: Plan) {
    this.planApi.editPlan(plan).subscribe(() => {
      this.getPlanList();
    });
  }

  filterPlan(date: Object): Plan[] {
    this.filterPlanList = this.planList.filter((plan) =>
      moment(plan.time).isSame(date, 'date')
    );
    this.filterPlanList.sort(({ time: a }, { time: b }) =>
      a > b ? 1 : a < b ? -1 : 0
    );
    return this.filterPlanList;
  }
}
