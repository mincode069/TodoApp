import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoComponent } from './todo.component';
import { WorkService } from './service/work.service';
import { WorkApiService } from './service/work-api.service';
import { WorkItemComponent } from './components/work/work-item/work-item.component';
import { WorkListComponent } from './components/work/work-list/work-list.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { WorkFormComponent } from './components/work/work-form/work-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { PlanItemComponent } from './components/plan/plan-item/plan-item.component';
import { PlanListComponent } from './components/plan/plan-list/plan-list.component';
import { PlanFormComponent } from './components/plan/plan-form/plan-form.component';
@NgModule({
  declarations: [
    HeaderComponent,
    TodoComponent,
    WorkItemComponent,
    WorkListComponent,
    WorkFormComponent,
    ConfirmDialogComponent,
    PlanItemComponent,
    PlanListComponent,
    PlanFormComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  exports: [TodoComponent, FormsModule, ReactiveFormsModule],
  providers: [WorkService, WorkApiService],
})
export class TodoModule {}
