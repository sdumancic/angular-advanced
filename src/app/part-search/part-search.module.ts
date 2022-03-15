import { NgModule } from '@angular/core';
import { PartSearchHomeComponent } from './part-search-home/part-search-home.component';
import { PartSearchRoutingModule } from './part-search-routing.module';
import { SharedFormsModule } from '../shared-forms/shared-forms.module';
import { MaterialModule } from '../shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PartSearchContainerComponent } from './part-search/part-search-container/part-search-container.component';
import { PartSearchFormFieldComponent } from './part-search/part-search-form-field/part-search-form-field.component';

@NgModule({
  declarations: [PartSearchHomeComponent, PartSearchContainerComponent, PartSearchFormFieldComponent],
  imports: [
    ReactiveFormsModule,
    PartSearchRoutingModule,
    SharedFormsModule,
    MaterialModule,
  ],
})
export class PartSearchModule {}
