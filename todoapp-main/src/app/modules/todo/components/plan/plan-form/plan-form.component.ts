import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkService } from '../../../service/work.service';
import { PlanService } from '../../../service/plan.service';
import { StatusEnum } from '../../../interface/work';
import { Plan } from '../../../interface/plan';
@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss'],
})
export class PlanFormComponent implements OnInit {
  planForm!: FormGroup;
  works!: Array<string>;
  @Output() buttonClick: EventEmitter<number> = new EventEmitter<number>();
  public stausEnum = StatusEnum;
  tests: Array<string> = ['hello', 'heelo2', 'hhh'];

  constructor(
    private formBuilder: FormBuilder,
    private planService: PlanService,
    private workService: WorkService
  ) {}

  ngOnInit(): void {
    this.planForm = this.formBuilder.group({
      time: ['', Validators.required],
      name: ['', Validators.required],
    });
    this.works = this.workService
      .filterWork(this.stausEnum.working)
      .map((e) => {
        return e['name'];
      });
  }

  get planFormControl() {
    return this.planForm.controls;
  }
  addPlan(plan: Plan) {
    this.planService.addPlan(plan);
    this.onToggle(2);
  }
  onToggle(valueForm: number) {
    this.buttonClick.emit(valueForm);
  }
}
