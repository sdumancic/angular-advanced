import { OrdersService } from '../../data-access/orders.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../data-access/order.model';
import { IOrderItem } from '../../data-access/order-items.model';

@Injectable({
  providedIn: 'any',
})
export class HomeFacadeService {
  constructor(private orderService: OrdersService) {}

  public getOrderDetails$(orderId: number): Observable<IOrder> {
    return this.orderService.fetchOrderDetails$(orderId);
  }

  public getOrderItems$(orderId: number): Observable<IOrderItem[]> {
    return this.orderService.fetchOrderItems$(orderId);
  }

  public addOrderItem$(item: IOrderItem): Observable<IOrderItem> {
    return this.orderService.addOrderItem$(item);
  }
}
