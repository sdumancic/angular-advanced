import { Injectable, OnInit } from '@angular/core';
import { StateHistoryPlugin } from '@datorama/akita';
import { forkJoin } from 'rxjs';
import { delay, take } from 'rxjs/operators';
import { OrdersService } from 'src/app/order-entry/data-access/orders.service';
import { OrderItemsQuery } from '../../state/order-items.query';
import { OrderItemsStore } from '../../state/order-items.store';
import { IOrderItemsSearchResultsUI } from '../presentation/order-items-search-results/order-items-search-results-ui.model';
import { OrderItemMapper } from './order-item-mapper';

@Injectable()
export class OrderItemsOverviewFacadeService implements OnInit {
  constructor(
    private ordersService: OrdersService,
    private store: OrderItemsStore
  ) {}

  ngOnInit() {}

  init(orderId: number) {
    this.store.setLoading(true);

    forkJoin([
      this.ordersService.fetchProductsGroups$(),
      this.ordersService.fetchOrderItems$(orderId),
    ])
      .pipe(take(1), delay(1000))
      .subscribe(([productGroups, orderItems]) => {
        this.store.set(
          OrderItemMapper.fromResourceToOrderItemSearchResultsUI(orderItems)
        );
        this.store.update({
          productGroups: productGroups,
        });
        this.store.setLoading(false);
      });
  }

  addOrderItem(item: IOrderItemsSearchResultsUI) {
    this.store.add(item);
  }

  updateOrderItem(item: IOrderItemsSearchResultsUI) {
    this.store.update(item.id, item);
  }

  setFilter(filter: string) {
    this.store.update({ filter: filter });
  }
}
