import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseFormComponent } from './base-form/base-form.component';
import { ChildFormComponent } from './base-form/child-form/child-form.component';
import { SharedFormsHomeComponent } from './shared-forms-home/shared-forms-home.component';

const routes: Routes = [
  {
    path: '',
    component: SharedFormsHomeComponent,
  },
  {
    path: 'base',
    component: BaseFormComponent,
  },
  {
    path: 'child',
    component: ChildFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedFormsRoutingModule {}
