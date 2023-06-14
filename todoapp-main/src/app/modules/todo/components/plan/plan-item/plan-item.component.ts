import { Component, Input } from '@angular/core';
import { Plan } from '../../../interface/plan';
import { PlanService } from '../../../service/plan.service';

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.scss'],
})
export class PlanItemComponent {
  @Input() plan!: Plan;

  constructor(private planService: PlanService) {}
}
