import { IOrderItem } from 'src/app/order-entry/data-access/order-items.model';
import { IOrderItemsSearchResultsUI } from '../presentation/order-items-search-results/order-items-search-results-ui.model';

export class OrderItemMapper {
  static fromResourceToOrderItemSearchResultsUI(
    items: IOrderItem[]
  ): IOrderItemsSearchResultsUI[] {
    return items.map((item) => {
      return <IOrderItemsSearchResultsUI>{
        id: item.id,
        orderId: item.orderId,
        productGroupCode: item.productGroup.code,
        productGroupName: item.productGroup.name,
        productCode: item.product.code,
        productName: item.product.name,
        amount: item.amount,
        quantity: item.quantity,
        vatAmount: item.vatAmount,
        totalAmount: item.totalAmount,
        status: 'original',
      };
    });
  }

  static fromNewSearchResultsUIToResource(
    item: IOrderItemsSearchResultsUI
  ): IOrderItem {
    return <IOrderItem>{
      id: item.id,
      orderId: item.orderId,
      productGroup: {
        code: item.productGroupCode,
        name: item.productGroupName,
      },
      product: {
        code: item.productCode,
        name: item.productName,
        price: null,
        productGroupCode: null,
      },
      amount: item.amount,
      vatAmount: item.vatAmount,
      totalAmount: item.totalAmount,
      quantity: item.quantity,
    };
  }
}
