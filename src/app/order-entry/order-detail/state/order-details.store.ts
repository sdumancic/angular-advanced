import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IOrderStatus, ISalesPerson } from '../../data-access/order.model';
import { IOrderDetailUI } from '../facade/order-detail-ui.model';

export interface OrderDetailsState {
  orderDetails: IOrderDetailUI;
  salesPersons: ISalesPerson[];
  orderStatuses: IOrderStatus[];
}

export function createInitialState(): OrderDetailsState {
  return {
    orderDetails: null,
    salesPersons: [],
    orderStatuses: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'order-details' })
export class OrderDetailsStore extends Store<OrderDetailsState> {
  constructor() {
    super(createInitialState());
  }
}
