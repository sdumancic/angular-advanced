import { OrdersService } from './../../data-access/orders.service';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderDetailFacadeService {

  constructor(private orderService: OrdersService) { }

  fetchOrderDetails$(orderId: number){
    return this.orderService.fetchOrderDetails$(orderId);
  }
}
