import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { DirtyCheckPlugin } from '@datorama/akita';
import { forkJoin, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { OrdersService } from 'src/app/order-entry/data-access/orders.service';
import { OrderItemsQuery } from '../../state/order-items.query';
import { OrderItemsStore } from '../../state/order-items.store';
import { IOrderItemsSearchResultsUI } from '../presentation/order-items-search-results/order-items-search-results-ui.model';
import { OrderItemMapper } from './order-item-mapper';

@Injectable()
export class OrderItemsOverviewFacadeService implements OnDestroy {
  private dirtyCheck: DirtyCheckPlugin;

  constructor(
    private ordersService: OrdersService,
    private store: OrderItemsStore,
    private query: OrderItemsQuery
  ) {}

  isDirty$() {
    if (!this.dirtyCheck) {
      return of(false);
    }
    return this.dirtyCheck?.isDirty$;
  }

  startLoading() {
    this.store.setLoading(true);
  }

  finishLoading() {
    this.store.setLoading(false);
  }

  setDirtyCheckHead() {
    this.dirtyCheck = new DirtyCheckPlugin(this.query, {
      watchProperty: 'entities',
    }).setHead();
  }

  init$(orderId: number) {
    return forkJoin([
      this.ordersService.fetchProductsGroups$(),
      this.ordersService.fetchOrderItems$(orderId),
    ]).pipe(
      delay(1000),
      map(([productGroups, orderItems]) => {
        this.store.set(
          OrderItemMapper.fromResourceToOrderItemSearchResultsUI(orderItems)
        );
        this.store.update({
          productGroups: productGroups,
        });
        return orderItems;
      })
    );
  }

  reset() {
    this.dirtyCheck.reset();
    return this.query.getValue().orderDetails;
  }

  addOrderItem(item: IOrderItemsSearchResultsUI) {
    this.store.add({ ...item, status: 'added' });
  }

  updateOrderItem(item: IOrderItemsSearchResultsUI) {
    this.store.update(item.id, { ...item, status: 'updated' });
  }

  deleteOrderItem(item: IOrderItemsSearchResultsUI) {
    this.store.update(item.id, { ...item, status: 'deleted' });
  }

  setFilter(filter: string) {
    this.store.update({ filter: filter });
  }

  ngOnDestroy(): void {
    this.dirtyCheck.destroy();
  }
}
