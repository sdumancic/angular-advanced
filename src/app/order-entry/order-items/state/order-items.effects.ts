import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  Effect,
  ofType,
} from '@datorama/akita-ng-effects';
import { map, tap } from 'rxjs/operators';
import { OrdersService } from '../../data-access/orders.service';
import { OrderItemMapper } from '../overview/facade/order-item-mapper';
import { OrderItemActions } from './order-items.actions';

@Injectable({ providedIn: 'root' })
export class OrderItemEffects {
  constructor(
    private actions$: Actions,
    private ordersService: OrdersService
  ) {}

  addItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderItemActions.addOrderItem),
        tap(({ orderItem }) =>
          this.ordersService.addOrderItem(
            OrderItemMapper.fromNewSearchResultsUIToResource(orderItem)
          )
        ),
        map(({ orderItem }) => {
          return OrderItemActions.addOrderItemSuccess({
            orderId: orderItem.orderId,
          });
        })
      ),
    { dispatch: true }
  );

  @Effect()
  addOrderItemSuccess = this.actions$.pipe(
    ofType(OrderItemActions.addOrderItemSuccess),
    map((state) => this.ordersService.updateTotals(state.orderId))
  );

  updateItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderItemActions.updateOrderItem),
        tap(({ payload }) =>
          this.ordersService.updateOrderItem(
            OrderItemMapper.fromNewSearchResultsUIToResource(payload.orderItem)
          )
        ),
        map(({ payload }) => {
          return OrderItemActions.addOrderItemSuccess({
            orderId: payload.orderItem.orderId,
          });
        })
      ),
    { dispatch: true }
  );

  @Effect()
  updateOrderItemSuccess = this.actions$.pipe(
    ofType(OrderItemActions.updateOrderItemSuccess),
    map(({ payload }) => this.ordersService.updateTotals(payload.orderId))
  );

  deleteItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderItemActions.deleteOrderItem),
        tap(({ payload }) => this.ordersService.deleteOrderItem(payload.id)),
        map(({ payload }) => {
          return OrderItemActions.deleteOrderItemSuccess({
            orderId: payload.orderId,
          });
        })
      ),
    { dispatch: true }
  );

  @Effect()
  deleteOrderItemSuccess = this.actions$.pipe(
    ofType(OrderItemActions.deleteOrderItemSuccess),
    map(({ payload }) => this.ordersService.updateTotals(payload.orderId))
  );
}
