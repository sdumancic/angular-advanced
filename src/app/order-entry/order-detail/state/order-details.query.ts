import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { OrderDetailsState, OrderDetailsStore } from './order-details.store';

@Injectable({ providedIn: 'root' })
export class OrderDetailsQuery extends Query<OrderDetailsState> {
  public selectOrderDetail$ = this.select((state) => state.orderDetails);
  public loading$ = this.selectLoading();
  public salesPersons$ = this.select((state) => state.salesPersons);
  public orderStatuses$ = this.select((state) => state.orderStatuses);

  constructor(protected store: OrderDetailsStore) {
    super(store);
  }
}
