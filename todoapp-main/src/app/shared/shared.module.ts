import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [ButtonComponent, TextFieldComponent],
  imports: [CommonModule, FormsModule],
  exports: [ButtonComponent, TextFieldComponent],
})
export class SharedModule {}
