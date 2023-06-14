import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../../service/plan.service';
@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss'],
})
export class PlanListComponent implements OnInit {
  plans = this.planService;
  interval!: ReturnType<typeof setInterval>;
  nowDate = new Date();
  tomorrow = new Date();

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.planService.getPlanList();
    this.interval = setInterval(() => {
      this.nowDate = new Date();
    }, 1000);
    this.tomorrow.setDate(this.nowDate.getDate() + 1);
  }
}
