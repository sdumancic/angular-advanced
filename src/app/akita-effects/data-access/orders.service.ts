import { Injectable, OnInit } from '@angular/core';
import { IOrderItem } from './order-items.model';
import { IOrder } from './order.model';
import * as orders from './data/orders'
import * as items from './data/order-items';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrdersService{

  private orders: IOrder[] = [];
  private items: IOrderItem[] = [];


  constructor() {
    this.orders = orders.data;
    this.items = items.data;
  }



  public fetchOrderDetails$(id: number): Observable<IOrder|null>{
    return of(this.orders.find(o => o.id === +id));
  }

  public fetchOrderItems$(orderId: number, page: number = 0, size: number = 10): Observable<IOrderItem[]>{
    return of(this.items.filter(i => i.orderId === +orderId))
  }
}


