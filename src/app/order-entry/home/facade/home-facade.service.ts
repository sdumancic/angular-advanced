import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IOrder } from '../../data-access/order.model';
import { OrdersService } from '../../data-access/orders.service';
import { OrderDetailsQuery } from '../../order-detail/state/order-details.query';
import { OrderItemsQuery } from '../../order-items/state/order-items.query';

@Injectable({
  providedIn: 'any',
})
export class HomeFacadeService {
  constructor(
    private orderService: OrdersService,
    private orderDetailsQuery: OrderDetailsQuery,
    private orderItemsQuery: OrderItemsQuery
  ) {}

  public getOrderDetails$(orderId: number): Observable<IOrder> {
    return this.orderService.fetchOrderDetails$(orderId);
  }

  public save$() {
    const all$ = this.orderItemsQuery.selectAll();
    const updated$ = all$.pipe(
      map((items) => items.filter((item) => item.status === 'updated'))
    );
    const deleted$ = all$.pipe(
      map((items) => items.filter((item) => item.status === 'deleted'))
    );
    const added$ = all$.pipe(
      map((items) => items.filter((item) => item.status === 'added'))
    );

    return zip(updated$, deleted$, added$);
  }
}
