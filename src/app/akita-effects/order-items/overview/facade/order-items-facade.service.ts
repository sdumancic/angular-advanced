import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import {
  IOrderItem,
  IProduct,
  IProductGroup,
} from 'src/app/akita-effects/data-access/order-items.model';
import { OrdersService } from 'src/app/akita-effects/data-access/orders.service';

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
