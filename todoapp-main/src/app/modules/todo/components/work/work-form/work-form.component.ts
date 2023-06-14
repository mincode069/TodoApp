import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkService } from '../../../service/work.service';
import { Work } from '../../../interface/work';

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.scss'],
})
export class WorkFormComponent implements OnInit {
  workForm!: FormGroup;
  @Output() buttonClick = new EventEmitter<number>();
  @Input() isEdit: Work = {} as Work;
  actionBtn: string = 'Save';
  constructor(
    private formBuilder: FormBuilder,
    private workService: WorkService
  ) {}

  ngOnInit(): void {
    this.workForm = this.formBuilder.group({
      name: ['', Validators.required],
      intended: ['', Validators.required],
      status: ['0', Validators.required],
      deadline: ['', Validators.required],
      id: ['', Validators.required],
    });

    if (this.isEdit.id) {
      this.actionBtn = 'Update';
      this.workForm.controls['name'].setValue(this.isEdit.name);
      this.workForm.controls['intended'].setValue(this.isEdit.intended);
      this.workForm.controls['status'].setValue(this.isEdit.status);
      this.workForm.controls['deadline'].setValue(this.isEdit.deadline);
      this.workForm.controls['id'].setValue(this.isEdit.id);
    }
  }

  get workFormControl() {
    return this.workForm.controls;
  }

  addNewWork(work: Work): void {
    if (!this.isEdit.id) {
      this.workService.addWork(work);
      this.onToggle(1);
    } else {
      this.editWork(work);
    }
  }

  editWork(work: Work) {
    this.workService.editWork(work);
    this.onToggle(1);

    this.isEdit.id = 0;
  }

  onToggle(value: number) {
    this.buttonClick.emit(value);
    this.isEdit.id = 0;
  }
}
