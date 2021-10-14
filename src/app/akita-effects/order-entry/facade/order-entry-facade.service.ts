import { OrdersService } from './../../data-access/orders.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class OrderEntryFacadeService {

  constructor(private orderService: OrdersService) { }

  public getOrderDetails$(orderId: number){
    this.orderService.fetchOrderDetails$(orderId);
  }

  public getOrderItems$(orderId: number){
    this.orderService.fetchOrderItems$(orderId);
  }
}
