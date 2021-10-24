import { Injectable, OnInit } from '@angular/core';
import { IOrderItem } from './order-items.model';
import { IOrder, IOrderStatus, ISalesPerson } from './order.model';
import * as orders from './data/orders';
import * as items from './data/order-items';
import * as salesPersons from './data/sales-persons';
import * as orderStatus from './data/order-statuses';
import { Observable, of, zip } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private orders: IOrder[] = [];
  private items: IOrderItem[] = [];
  private salesPersons: ISalesPerson[] = [];
  private orderStatus: IOrderStatus[] = [];

  constructor() {
    this.orders = orders.data;
    this.items = items.data;
    this.salesPersons = salesPersons.data;
    this.orderStatus = orderStatus.data;
  }

  public fetchOrderDetails$(id: number): Observable<IOrder | null> {
    return of(this.orders.find((o) => o.id === +id));
  }

  public fetchOrderItems$(
    orderId: number,
    page: number = 0,
    size: number = 10
  ): Observable<IOrderItem[]> {
    return of(this.items.filter((i) => i.orderId === +orderId));
  }

  public fetchSalesPersons$() {
    return of(this.salesPersons);
  }

  public fetchMetadata$() {
    const o1 = of(this.salesPersons);
    const o2 = of(this.orderStatus);
    return zip(o1, o2);
  }

  public fetchSalesPersonById(id: string) {
    return of(this.salesPersons.find((i) => i.id === id));
  }

  public fetchOrderStatusById(id: string) {
    return of(this.orderStatus.find((i) => i.code === id));
  }
}
