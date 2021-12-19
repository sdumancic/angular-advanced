import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleAddressControlComponent } from './container/simple-address-control.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material/material.module';
import { UtilsModule } from '../shared/modules/utils/utils.module';

@NgModule({
  declarations: [SimpleAddressControlComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, UtilsModule],
  exports: [SimpleAddressControlComponent],
})
export class SimpleAddressModuleModule {}
