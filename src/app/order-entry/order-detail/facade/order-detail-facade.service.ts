import { Injectable, OnDestroy } from '@angular/core';
import { DirtyCheckPlugin } from '@datorama/akita';
import { forkJoin, of, Subject, Subscription } from 'rxjs';
import { delay, map, takeUntil } from 'rxjs/operators';
import { OrderDetailsQuery } from '../state/order-details.query';
import { OrderDetailsStore } from '../state/order-details.store';
import { OrdersService } from './../../data-access/orders.service';
import { IOrderDetailUI } from './order-detail-ui.model';
import { OrderDetailMapper } from './order-detail.mapper';

@Injectable({ providedIn: 'any' })
export class OrderDetailFacadeService implements OnDestroy {
  private dirtyCheck: DirtyCheckPlugin;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private ordersService: OrdersService,
    private store: OrderDetailsStore,
    private query: OrderDetailsQuery
  ) {}

  isDirty$() {
    if (!this.dirtyCheck) {
      return of(false);
    }
    return this.dirtyCheck?.isDirty$;
  }

  startLoading() {
    this.store.setLoading(true);
  }

  finishLoading() {
    this.store.setLoading(false);
  }

  setDirtyCheckHead() {
    this.dirtyCheck = new DirtyCheckPlugin(this.query, {
      watchProperty: 'orderDetails',
    }).setHead();
  }

  init$(orderId: number) {
    return forkJoin([
      this.ordersService.fetchSalesPersons$(),
      this.ordersService.fetchOrderStatuses$(),
      this.ordersService.fetchOrderDetails$(orderId),
    ]).pipe(
      delay(500),
      map(([salesPersons, orderStatuses, orderDetails]) => {
        const orderDetailUI: IOrderDetailUI =
          OrderDetailMapper.fromResourceToOrderDetailUI(orderDetails);
        this.store.update({
          orderDetails: orderDetailUI,
          salesPersons: salesPersons,
          orderStatuses: orderStatuses,
        });
        return orderDetailUI;
      })
    );
  }

  updateFormValue(orderDetail: IOrderDetailUI) {
    this.store.update({ orderDetails: orderDetail });
  }
  reset() {
    this.dirtyCheck.reset();
    return this.query.getValue().orderDetails;
  }

  salesPersons$() {
    return this.query.salesPersons$;
  }

  salesPerson$(id: string) {
    return this.query.salesPersons$.pipe(
      map((persons) => persons.find((person) => person.id === id))
    );
  }

  statuses$() {
    return this.query.orderStatuses$;
  }

  isLoading$() {
    return this.query?.selectLoading();
  }

  orderStatus$(code: string) {
    return this.query.orderStatuses$.pipe(
      map((statues) => statues.find((status) => status.code === code))
    );
  }

  ngOnDestroy(): void {
    this.dirtyCheck.destroy();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
