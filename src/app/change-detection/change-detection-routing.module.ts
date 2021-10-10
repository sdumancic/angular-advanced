import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeDetectionHomeComponent } from './change-detection-home/change-detection-home.component';

const routes: Routes = [
  {
    path: '',
    component: ChangeDetectionHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeDetectionRoutingModule {}
