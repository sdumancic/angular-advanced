import { IOrderItem } from 'src/app/akita-effects/data-access/order-items.model';
import { IOrderItemsSearchResultsUI } from './order-items-search-results-ui.model';

export class OrderItemMapper {
  static fromResourceToOrderItemSearchResultsUI(
    items: IOrderItem[]
  ): IOrderItemsSearchResultsUI[] {
    return items.map((item) => {
      return <IOrderItemsSearchResultsUI>{
        id: item.id,
        productGroupCode: item.productGroup.code,
        productGroupName: item.productGroup.name,
        productCode: item.product.code,
        productName: item.product.name,
        amount: item.amount,
        vatAmount: item.vatAmount,
        totalAmount: item.totalAmount,
      };
    });
  }
}
