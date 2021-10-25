import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AkitaEffectsRoutingModule } from './akita-effects-routing.module';

import { MaterialModule } from '../shared/modules/material/material.module';
import { OrderEntryComponent } from './order-entry/container/order-entry.component';
import { ToolbarComponent } from './order-entry/presentation/toolbar/toolbar.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

import { OrderEntryFacadeService } from './order-entry/facade/order-entry-facade.service';

import { OrderItemsSearchResultsComponent } from './order-items/overview/presentation/order-items-search-results/order-items-search-results.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OrderItemsOverviewComponent } from './order-items/overview/container/order-items-overview.component';
import { CreateItemDialogComponent } from './order-items/create/container/dialog/create-item-dialog/create-item-dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    AkitaEffectsRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  declarations: [
    OrderEntryComponent,
    ToolbarComponent,
    OrderDetailComponent,
    OrderItemsOverviewComponent,
    OrderItemsSearchResultsComponent,
    CreateItemDialogComponent,
  ],
  providers: [
    OrderEntryFacadeService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  entryComponents: [CreateItemDialogComponent],
})
export class AkitaEffectsModule {}
