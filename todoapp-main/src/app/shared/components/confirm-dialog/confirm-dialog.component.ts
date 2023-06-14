import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  @Input() isDialog!: Observable<boolean>;
  @Output() handleDelete = new EventEmitter<Function>();
  @Input() nameWork!: string;
  @Output() closeDialog = new EventEmitter<Function>();
  constructor() {}

  deleteWork() {
    this.handleDelete.emit();
  }
  close() {
    this.closeDialog.emit();
  }
}
