import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { ActivatedRoute } from '@angular/router';
import { Actions } from '@datorama/akita-ng-effects';
import { Observable, of, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { IOrder } from '../../data-access/order.model';
import { OrderDetailComponent } from '../../order-detail/container/order-detail.component';
import { OrderItemsOverviewComponent } from '../../order-items/overview/container/order-items-overview.component';
import { OrderItemActions } from '../../order-items/state/order-items.actions';
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
    private route: ActivatedRoute,
    private actions: Actions
  ) {}

  onRevert() {
    this.orderDetailComponent.reset();
    this.orderItemsOverviewComponent.reset();
  }

  onSave() {
    this.facade
      .save$()
      .pipe(take(1))
      .subscribe(([updated, deleted, added]) => {
        this.orderDetailComponent.reset();
        this.orderItemsOverviewComponent.reset();

        added.forEach((orderItem) => {
          this.actions.dispatch(OrderItemActions.addOrderItem({ orderItem }));
        });

        updated.forEach((orderItem) => {
          console.log(orderItem);
          this.actions.dispatch(
            OrderItemActions.updateOrderItem({ orderItem })
          );
        });

        deleted.forEach((orderItem) => {
          this.actions.dispatch(
            OrderItemActions.deleteOrderItem({
              id: orderItem.id,
              orderId: orderItem.orderId,
            })
          );
        });
      });
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
