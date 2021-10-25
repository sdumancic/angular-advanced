import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IOrderItem } from 'src/app/akita-effects/data-access/order-items.model';
import { deepEqualArray } from 'src/app/akita-effects/util/deep-equal-utils';
import { CreateItemDialogComponent } from '../../create/container/dialog/create-item-dialog/create-item-dialog.component';
import { OrderItemMapper } from '../facade/order-item-mapper';
import { IOrderItemsSearchResultsUI } from '../facade/order-items-search-results-ui.model';

@Component({
  selector: 'app-order-items-overview',
  templateUrl: './order-items-overview.component.html',
  styleUrls: ['./order-items-overview.component.scss'],
})
export class OrderItemsOverviewComponent implements OnInit {
  private _orderItems: IOrderItem[];
  orderItemsSearchResults: IOrderItemsSearchResultsUI[] = [];

  get orderItems() {
    return this._orderItems;
  }

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

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onAddItem() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '640px';
    dialogConfig.width = '600px';
    dialogConfig.data = {
      animal: 'panda',
    };

    const dialogRef = this.dialog.open(CreateItemDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
