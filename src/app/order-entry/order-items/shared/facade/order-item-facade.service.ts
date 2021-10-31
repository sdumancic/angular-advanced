import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { OrdersService } from 'src/app/order-entry/data-access/orders.service';
import { OrderItemsQuery } from '../../state/order-items.query';
import { OrderItemsStore } from '../../state/order-items.store';

@Injectable()
export class OrderItemFacadeService {
  constructor(
    private query: OrderItemsQuery,
    private orderService: OrdersService,
    private store: OrderItemsStore
  ) {}

  productGroups$() {
    return this.query.productGroups$;
  }

  products$() {
    return this.query.products$;
  }

  fetchProductsForGroup$(group: string) {
    this.orderService
      .fetchProducts$()
      .pipe(
        map((products) =>
          products.filter((product) => product.productGroupCode === group)
        ),
        take(1)
      )
      .subscribe((products) => {
        this.store.update({
          products: products,
        });
      });
  }

  getProductGroupName$(code: string): Observable<string> {
    return this.productGroups$().pipe(
      map((groups) => groups.filter((group) => group.code === code)),
      map((group) => group[0].name)
    );
  }

  getProductName$(code: string): Observable<string> {
    return this.products$().pipe(
      map((products) => products.filter((product) => product.code === code)),
      map((product) => product[0].name)
    );
  }
}
