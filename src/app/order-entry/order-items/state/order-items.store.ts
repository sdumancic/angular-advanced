import { Injectable } from '@angular/core';
import {
  ActiveState,
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import { IProduct, IProductGroup } from '../../data-access/order-items.model';
import { IOrderItemsSearchResultsUI } from '../overview/presentation/order-items-search-results/order-items-search-results-ui.model';

export interface OrderItemsState
  extends EntityState<IOrderItemsSearchResultsUI>,
    ActiveState {
  productGroups: IProductGroup[];
  products: IProduct[];
  filter: string;
}

const initState = {
  productGroups: [],
  products: [],
  active: null,
  filter: null,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'order-items', idKey: 'id' })
export class OrderItemsStore extends EntityStore<OrderItemsState> {
  constructor() {
    super(initState);
  }
}
