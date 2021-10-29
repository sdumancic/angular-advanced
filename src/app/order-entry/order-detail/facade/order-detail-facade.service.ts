import { OrdersService } from './../../data-access/orders.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class OrderDetailFacadeService {
  constructor(private orderService: OrdersService) {}

  salesPersons$() {
    return this.orderService.fetchSalesPersons$();
  }

  salesPerson$(id: string) {
    return this.orderService.fetchSalesPersonById(id);
  }

  orderStatus$(id: string) {
    return this.orderService.fetchOrderStatusById(id);
  }

  statuses$() {
    return this.orderService.fetchOrderStatuses$();
  }

  orderDetails$(orderId: number) {
    return this.orderService.fetchOrderDetails$(orderId);
  }

  pizza$() {
    return of([
      { id: 'j8P9sz', name: 'Pepperoni', price: 899 },
      { id: 'tMot06', name: 'Supreme', price: 999 },
      { id: 'x9sD3g', name: 'Sizzler', price: 899 },
    ]);
  }
}
