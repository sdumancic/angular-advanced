import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OnlyOneErrorPipe } from './pipes/only-one-error.pipe';

@NgModule({
  declarations: [OnlyOneErrorPipe],
  imports: [CommonModule],
  exports: [OnlyOneErrorPipe],
})
export class UtilsModule {}
