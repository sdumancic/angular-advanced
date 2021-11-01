import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, take, takeUntil, tap } from 'rxjs/operators';
import { CreateItemDialogComponent } from '../../create/container/dialog/create-item-dialog/create-item-dialog.component';
import { OrderItemsQuery } from '../../state/order-items.query';
import { OrderItemsOverviewFacadeService } from '../facade/order-items-overview-facade.service';
import { IOrderItemsSearchResultsUI } from '../presentation/order-items-search-results/order-items-search-results-ui.model';
import { StateHistoryPlugin } from '@datorama/akita';
import { EditItemDialogComponent } from '../../edit/container/dialog/edit-item-dialog/edit-item-dialog.component';
import { OrderItemsSearchResultsComponent } from '../presentation/order-items-search-results/order-items-search-results.component';

@Component({
  selector: 'app-order-items-overview',
  templateUrl: './order-items-overview.component.html',
  styleUrls: ['./order-items-overview.component.scss'],
})
export class OrderItemsOverviewComponent implements OnInit, OnDestroy {
  private _orderId: number;
  isLoading$ = this.query.selectLoading();
  orderItemsSearchResults: IOrderItemsSearchResultsUI[];

  @ViewChild('searchResults')
  searchResultsComponent: OrderItemsSearchResultsComponent;
  @Input() set orderId(value: number) {
    if (value) {
      this.facade.startLoading();
      if (this.stateHistory) {
        this.stateHistory.ignoreNext();
      }
      this.facade
        .init$(value)
        .pipe(take(1))
        .subscribe((orderItemsUi) => {
          this.facade.finishLoading();
          this.facade.setDirtyCheckHead();
        });
      this._orderId = value;
    }
  }

  get orderId() {
    return this._orderId;
  }

  filterControl: FormControl = new FormControl();
  private unsubscribe$ = new Subject<void>();

  stateHistory: StateHistoryPlugin;

  constructor(
    public dialog: MatDialog,
    private facade: OrderItemsOverviewFacadeService,
    private query: OrderItemsQuery
  ) {
    this.stateHistory = new StateHistoryPlugin(this.query, {
      watchProperty: 'entities',
    });
  }

  isDirty$() {
    return this.facade.isDirty$();
  }

  ngOnInit() {
    this.filterControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$), debounceTime(200))
      .subscribe((filter) => {
        this.facade.setFilter(filter);
      });

    this.query.selectFilteredItems$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((items) => {
        this.orderItemsSearchResults = items;
      });
  }
  onAddItem() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '500px';
    dialogConfig.width = '500px';
    dialogConfig.data = {
      orderId: this.orderId,
      productGroups$: this.query.productGroups$,
      products$: this.query.products$,
    };

    const dialogRef = this.dialog.open(CreateItemDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          result.id = -1 * (this.query.getCount() + 1);
          this.facade.addOrderItem(result);
        }
      });
  }

  onEditItem(item: IOrderItemsSearchResultsUI) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '500px';
    dialogConfig.width = '500px';
    dialogConfig.data = {
      orderId: this.orderId,
      orderItem: item,
      productGroups$: this.query.productGroups$,
      products$: this.query.products$,
    };

    const dialogRef = this.dialog.open(EditItemDialogComponent, dialogConfig);
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.facade.updateOrderItem(result);
        }
      });
  }

  onDeleteItem(item: IOrderItemsSearchResultsUI) {
    this.facade.deleteOrderItem(item);
  }

  numPastActions() {
    return (this.stateHistory as any).history?.past?.length;
  }

  numFutureActions() {
    return (this.stateHistory as any).history?.future.length;
  }

  undo() {
    this.stateHistory.undo();
  }

  redo() {
    this.stateHistory.redo();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  reset() {
    this.facade.reset();
    this.stateHistory.clear();
    this.searchResultsComponent.reset();
  }
}
