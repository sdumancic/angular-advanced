import { Injectable, OnInit } from '@angular/core';
import { IOrderItem, IProduct, IProductGroup } from './order-items.model';
import { IOrder, IOrderStatus, ISalesPerson } from './order.model';
import * as orders from './data/orders';
import * as items from './data/order-items';
import * as salesPersons from './data/sales-persons';
import * as orderStatus from './data/order-statuses';
import * as productGroups from './data/product-groups';
import * as products from './data/products';
import { Observable, of, throwError, zip } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private orders: IOrder[] = [];
  private items: IOrderItem[] = [];
  private salesPersons: ISalesPerson[] = [];
  private orderStatus: IOrderStatus[] = [];
  private productGroups: IProductGroup[] = [];
  private products: IProduct[] = [];

  constructor() {
    this.orders = orders.data;
    this.items = items.data;
    this.salesPersons = salesPersons.data;
    this.orderStatus = orderStatus.data;
    this.productGroups = productGroups.data;
    this.products = products.data;
  }

  public fetchOrderDetails$(id: number): Observable<IOrder | null> {
    const order = this.orders.find((o) => o.id === +id);
    if (!order) {
      return throwError(
        `Order with id ${id} does not exist, refine your criteria`
      );
    }
    return of(order);
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

  public fetchOrderStatuses$() {
    return of(this.orderStatus);
  }

  public fetchProductMetadata$() {
    const o1 = of(this.productGroups);
    const o2 = of(this.products);
    return zip(o1, o2).pipe(shareReplay(1));
  }

  public fetchProducts$() {
    return this.fetchProductMetadata$().pipe(
      map(([groups, products]) => products)
    );
  }

  public fetchProductsGroups$() {
    return this.fetchProductMetadata$().pipe(
      map(([groups, products]) => groups)
    );
  }

  public fetchSalesPersonById(id: string) {
    return of(this.salesPersons.find((i) => i.id === id));
  }

  public fetchOrderStatusById(id: string) {
    return of(this.orderStatus.find((i) => i.code === id));
  }

  public addOrderItem$(item: IOrderItem): Observable<IOrderItem> {
    item.id = Math.random();
    this.items.push(item);
    return of(item);
  }
}
