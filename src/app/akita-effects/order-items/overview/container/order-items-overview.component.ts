import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IOrderItem } from 'src/app/akita-effects/data-access/order-items.model';
import { deepEqualArray } from 'src/app/akita-effects/util/deep-equal-utils';
import { CreateItemDialogComponent } from '../../create/container/dialog/create-item-dialog/create-item-dialog.component';
import { OrderItemMapper } from '../facade/order-item-mapper';
import { OrderItemsFacadeService } from '../facade/order-items-facade.service';
import { IOrderItemsSearchResultsUI } from '../facade/order-items-search-results-ui.model';

@Component({
  selector: 'app-order-items-overview',
  templateUrl: './order-items-overview.component.html',
  styleUrls: ['./order-items-overview.component.scss'],
  providers: [OrderItemsFacadeService],
})
export class OrderItemsOverviewComponent implements OnInit {
  @Input()
  set orderItems(value: IOrderItem[]) {
    if (deepEqualArray(this._orderItems, value) === false) {
      this._orderItems = value;
      if (value) {
        this.orderItemsSearchResults =
          OrderItemMapper.fromResourceToOrderItemSearchResultsUI(value);
      }
    }
  }
  @Output() newItemEvent = new EventEmitter();

  private _orderItems: IOrderItem[];
  orderItemsSearchResults: IOrderItemsSearchResultsUI[] = [];

  get orderItems() {
    return this._orderItems;
  }

  constructor(
    public dialog: MatDialog,
    private facade: OrderItemsFacadeService
  ) {}

  ngOnInit(): void {
    this.facade.init();
  }

  onAddItem() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '500px';
    dialogConfig.width = '500px';
    dialogConfig.data = {
      productGroups$: this.facade.productGroups$,
      products$: this.facade.products$,
    };

    const dialogRef = this.dialog.open(CreateItemDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.newItemEvent.emit(result);
      }
    });
  }
}
