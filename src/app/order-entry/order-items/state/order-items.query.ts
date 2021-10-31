import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IOrderItemsSearchResultsUI } from '../overview/presentation/order-items-search-results/order-items-search-results-ui.model';
import { OrderItemsState, OrderItemsStore } from './order-items.store';

@Injectable({ providedIn: 'root' })
export class OrderItemsQuery extends QueryEntity<OrderItemsState> {
  public orderItems$ = this.selectAll();
  public loading$ = this.selectLoading();

  public productGroups$ = this.select((state) => state.productGroups);
  public products$ = this.select((state) => state.products);

  public orderItem$(id: number) {
    return this.selectEntity(id);
  }

  public selectFilter$ = this.select((state) => state.filter);
  public selectFilteredItems$ = combineLatest([
    this.selectFilter$,
    this.selectAll({
      filterBy: (entity) => entity !== undefined,
    }),
  ]).pipe(
    map(([filter, items]) => {
      return this.getFilteredOrderItems(filter, items);
    })
  );

  constructor(protected store: OrderItemsStore) {
    super(store);
  }

  private getFilteredOrderItems(
    filter: string,
    orderItems: IOrderItemsSearchResultsUI[]
  ) {
    if (filter && filter.length > 0) {
      return orderItems.filter((item) => {
        return (
          item.productName.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
          item.productGroupName.toLowerCase().indexOf(filter.toLowerCase()) > -1
        );
      });
    } else {
      return orderItems;
    }
  }
}
