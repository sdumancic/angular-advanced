import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartSearchHomeComponent } from './part-search-home/part-search-home.component';

const routes: Routes = [
  {
    path: '',
    component: PartSearchHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartSearchRoutingModule {}
