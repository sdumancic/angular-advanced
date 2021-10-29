import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/modules/material/material.module';

import { OrderItemsSearchResultsComponent } from './order-items/overview/presentation/order-items-search-results/order-items-search-results.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OrderItemsOverviewComponent } from './order-items/overview/container/order-items-overview.component';
import { CreateItemDialogComponent } from './order-items/create/container/dialog/create-item-dialog/create-item-dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderEntryRoutingModule } from './order-entry-routing.module';
import { ToolbarComponent } from './order-toolbar/toolbar.component';
import { HomeFacadeService } from './home/facade/home-facade.service';
import { HomeComponent } from './home/container/home.component';

@NgModule({
  imports: [
    CommonModule,
    OrderEntryRoutingModule,
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
    HomeComponent,
    ToolbarComponent,
    OrderDetailComponent,
    OrderItemsOverviewComponent,
    OrderItemsSearchResultsComponent,
    CreateItemDialogComponent,
  ],
  providers: [
    HomeFacadeService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  entryComponents: [CreateItemDialogComponent],
})
export class OrderEntryModule {}
