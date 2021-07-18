import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseFormComponent } from './base-form/base-form.component';
import { ChildFormComponent } from './base-form/child-form/child-form.component';
import { SharedFormsRoutingModule } from './shared-forms-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SharedFormsHomeComponent } from './shared-forms-home/shared-forms-home.component';

@NgModule({
  declarations: [
    BaseFormComponent,
    ChildFormComponent,
    SharedFormsHomeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedFormsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class SharedFormsModule {}
