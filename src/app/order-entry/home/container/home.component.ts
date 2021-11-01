import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { IOrder } from '../../data-access/order.model';
import { OrderDetailComponent } from '../../order-detail/container/order-detail.component';
import { OrderItemsOverviewComponent } from '../../order-items/overview/container/order-items-overview.component';
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

  @ViewChild('orderDetail') orderDetailComponent: OrderDetailComponent;
  @ViewChild('orderItems')
  orderItemsOverviewComponent: OrderItemsOverviewComponent;

  constructor(
    private facade: HomeFacadeService,
    private route: ActivatedRoute
  ) {}

  onRevert() {
    this.orderDetailComponent.reset();
    this.orderItemsOverviewComponent.reset();
  }

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
