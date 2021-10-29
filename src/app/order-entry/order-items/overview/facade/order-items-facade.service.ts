import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IProductGroup,
  IProduct,
} from 'src/app/order-entry/data-access/order-items.model';
import { OrdersService } from 'src/app/order-entry/data-access/orders.service';

@Injectable()
export class OrderItemsFacadeService {
  productGroups$: Observable<IProductGroup[]>;
  products$: Observable<IProduct[]>;

  constructor(private service: OrdersService) {}

  init() {
    this.productGroups$ = this.service.fetchProductsGroups$();
    this.products$ = this.service.fetchProducts$();
  }
}
