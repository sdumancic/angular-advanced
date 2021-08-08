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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
