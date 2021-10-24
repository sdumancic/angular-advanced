import { Component, Input, OnInit } from '@angular/core';
import { IOrderItem } from '../../data-access/order-items.model';
import { deepEqualArray } from '../../util/deep-equal-utils';
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

  constructor() {}

  ngOnInit(): void {}
}
