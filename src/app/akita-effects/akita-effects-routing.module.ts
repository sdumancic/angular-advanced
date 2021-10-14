import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderEntryComponent } from './order-entry/container/order-entry.component';


const routes: Routes = [
  {
    path: '',
    component: OrderEntryComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AkitaEffectsRoutingModule {}
