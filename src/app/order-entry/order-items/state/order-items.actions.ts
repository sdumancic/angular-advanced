import { ID } from '@datorama/akita';
import { createAction, payload, props } from '@datorama/akita-ng-effects';
import { IOrderDetailUI } from '../../order-detail/facade/order-detail-ui.model';
import { IOrderItemsSearchResultsUI } from '../overview/presentation/order-items-search-results/order-items-search-results-ui.model';

export namespace OrderItemActions {
  export const addOrderItem = createAction(
    'Add Item',
    props<{ orderItem: IOrderItemsSearchResultsUI }>()
  );
  export const addOrderItemSuccess = createAction(
    'Add Item success',
    props<{ orderId: number }>()
  );

  export const updateOrderItem = createAction(
    '[Order Item] Update Item',
    payload<{ orderItem: IOrderItemsSearchResultsUI }>()
  );

  export const updateOrderItemSuccess = createAction(
    '[Order Item] Update Item Success',
    payload<{ orderId: number }>()
  );

  export const deleteOrderItem = createAction(
    '[Order Item] Remove Item',
    payload<{ id: number; orderId: number }>()
  );

  export const deleteOrderItemSuccess = createAction(
    '[Order Item] Remove Item Success',
    payload<{ orderId: number }>()
  );
}
