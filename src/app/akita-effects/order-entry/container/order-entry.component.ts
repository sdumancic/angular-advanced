import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject, zip } from 'rxjs';
import {
  takeUntil,
  switchMap,
  mergeMap,
  tap,
  concatMap,
  take,
} from 'rxjs/operators';
import { IOrderItem } from '../../data-access/order-items.model';
import { IOrder } from '../../data-access/order.model';
import { OrderEntryFacadeService } from '../facade/order-entry-facade.service';

@Component({
  selector: 'app-order-entry',
  templateUrl: './order-entry.component.html',
  styleUrls: ['./order-entry.component.scss'],
})
export class OrderEntryComponent implements OnInit {
  public orderId: number = null;
  public order: IOrder = null;
  public orderItems: IOrderItem[] = null;
  private unsubscribe$ = new Subject();
  private lastEmittedOrderId: number = null;

  constructor(
    private facade: OrderEntryFacadeService,
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
      zip(
        this.facade.getOrderDetails$(orderIdNumber),
        this.facade.getOrderItems$(orderIdNumber)
      )
        .pipe(
          take(1),
          tap(([order, orderItems]) => {
            this.order = order;
            this.orderItems = orderItems;
          })
        )
        .subscribe(() => {
          this.orderId = orderIdNumber;
          this.lastEmittedOrderId = orderIdNumber;
        });
    }
  }

  onItemCreated(item: IOrderItem) {
    console.log('onItemCreated --> ', item);
  }
}
