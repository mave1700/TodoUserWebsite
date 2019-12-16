import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';



@NgModule({
  declarations: [ErrorModalComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorModalComponent
  ]
})
export class SharedModule { }
