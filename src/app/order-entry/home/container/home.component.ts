import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, zip } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { IOrderItem } from '../../data-access/order-items.model';
import { IOrder } from '../../data-access/order.model';
import { HomeFacadeService } from '../facade/home-facade.service';

@Component({
  selector: 'app-order-entry',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public orderId: number = null;
  public order: IOrder = null;
  private unsubscribe$ = new Subject();
  private lastEmittedOrderId: number = null;

  constructor(
    private facade: HomeFacadeService,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe((p) => {
      if (p.orderId) {
        this.onOrderNumberUpdated(p.orderId);
      }
    });
  }

  onOrderNumberUpdated(orderId: string) {
    let orderIdNumber: number;
    orderIdNumber = Number(orderId);
    if (
      !Number.isNaN(orderIdNumber) &&
      this.lastEmittedOrderId !== orderIdNumber
    ) {
      this.facade
        .getOrderDetails$(orderIdNumber)
        .pipe(
          take(1),
          tap((order) => {
            this.order = order;
          })
        )
        .subscribe(
          () => {
            this.orderId = orderIdNumber;
            this.lastEmittedOrderId = orderIdNumber;
          },
          (error) => {
            console.log(error);
            this.orderId = null;
            this.order = null;
          }
        );
    }
  }
}
