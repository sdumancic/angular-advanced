import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LazyModule } from './lazy/lazy.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'lazy',
    loadChildren: () => import('./lazy/lazy.module').then((m) => m.LazyModule),
  },
  {
    path: 'shared-forms',
    loadChildren: () =>
      import('./shared-forms/shared-forms.module').then(
        (m) => m.SharedFormsModule
      ),
  },
  {
    path: 'async-validators',
    loadChildren: () =>
      import('./async-validators/async-validators.module').then(
        (m) => m.AsyncValidatorsModule
      ),
  },
  {
    path: 'akita-home',
    loadChildren: () =>
      import('./akita/akita.module').then((m) => m.AkitaModule),
  },
  {
    path: 'order-entry',
    loadChildren: () =>
      import('./order-entry/order-entry.module').then(
        (m) => m.OrderEntryModule
      ),
  },
  {
    path: 'change-detection-home',
    loadChildren: () =>
      import('./change-detection/change-detection.module').then(
        (m) => m.ChangeDetectionModule
      ),
  },
  {
    path: 'tree-drag-drop',
    loadChildren: () =>
      import('./tree-drag-drop/tree-drag-drop.module').then(
        (m) => m.TreeDragDropModule
      ),
  },
  {
    path: 'css-ordering',
    loadChildren: () =>
      import('./css-grid-order/css-grid-order.module').then(
        (m) => m.CssGridOrderModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
