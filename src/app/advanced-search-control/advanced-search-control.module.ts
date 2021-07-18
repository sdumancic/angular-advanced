import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFormFieldControlComponent } from './custom-form-field-control/custom-form-field-control.component';
import { SearchFormFieldContainerComponent } from './search-form-field-container/search-form-field-container.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CustomFormFieldButtonsComponent } from './custom-form-field-buttons/custom-form-field-buttons.component';
import { SearchFormFieldButtonsContainerComponent } from './search-form-field-buttons-container/search-form-field-buttons-container.component';

@NgModule({
  declarations: [
    CustomFormFieldControlComponent,
    SearchFormFieldContainerComponent,
    CustomFormFieldButtonsComponent,
    SearchFormFieldButtonsContainerComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  exports: [
    CustomFormFieldControlComponent,
    SearchFormFieldContainerComponent,
    SearchFormFieldButtonsContainerComponent,
    CustomFormFieldButtonsComponent,
  ],
})
export class AdvancedSearchControlModule {}
