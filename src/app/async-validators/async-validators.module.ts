import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWithAsyncValidatorComponent } from './form-with-async-validator/form-with-async-validator.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncValidatorsRoutingModule } from './async-validators-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [FormWithAsyncValidatorComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    AsyncValidatorsRoutingModule,
    MatButtonModule,
  ],
  exports: [FormWithAsyncValidatorComponent],
})
export class AsyncValidatorsModule {}
