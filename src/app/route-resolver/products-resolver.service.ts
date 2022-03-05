import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, take } from 'rxjs/operators';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsResolverService implements Resolve<any> {
  constructor(private productsService: ProductsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    console.log('Called Get Product in resolver...', route);
    return this.productsService.getProducts().pipe(
      take(1),
      delay(3000),
      catchError((error) => {
        return of('No data');
      })
    );
  }
}
