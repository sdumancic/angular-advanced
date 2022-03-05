import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-route-resolver-home',
  templateUrl: './route-resolver-home.component.html',
  styleUrls: ['./route-resolver-home.component.scss'],
})
export class RouteResolverHomeComponent implements OnInit {
  products: Product[];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(
      'Activated route data in Component:::',
      this.activatedRoute.data
    );
    this.activatedRoute.data.pipe(take(1)).subscribe((response: any) => {
      console.log('PRODUCT FETCHING', response);
      this.products = response.products;
      console.log('PRODUCT FETCHED');
    });
  }
}
