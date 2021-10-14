import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AkitaEffectsRoutingModule } from './akita-effects-routing.module';



import { MaterialModule } from '../shared/modules/material/material.module';
import { OrderEntryComponent } from './order-entry/container/order-entry.component';
import { ToolbarComponent } from './order-entry/presentation/toolbar/toolbar.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderItemsOverviewComponent } from './order-items-overview/order-items-overview.component';
import { OrderEntryFacadeService } from './order-entry/facade/order-entry-facade.service';


@NgModule({
  imports: [
    CommonModule,
    AkitaEffectsRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  declarations: [OrderEntryComponent, ToolbarComponent, OrderDetailComponent, OrderItemsOverviewComponent],
  providers:[OrderEntryFacadeService]
})
export class AkitaEffectsModule {}
