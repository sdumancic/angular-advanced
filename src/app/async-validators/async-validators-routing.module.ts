import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormWithAsyncValidatorComponent } from './form-with-async-validator/form-with-async-validator.component';

const routes: Routes = [
  {
    path: '',
    component: FormWithAsyncValidatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsyncValidatorsRoutingModule {}
