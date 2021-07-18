import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyChildComponent } from './lazy-child/lazy-child.component';
import { LazyComponent } from './lazy.component';

const routes: Routes = [
  {
    path: '',
    component: LazyComponent,
  },
  {
    path: 'child',
    component: LazyChildComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LazyRoutingModule {}
