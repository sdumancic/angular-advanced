import { IOrder } from '../../data-access/order.model';
import { IOrderDetailUI } from './order-detail-ui.model';

export class OrderDetailMapper {
  static fromResourceToOrderDetailUI(order: IOrder): IOrderDetailUI {
    return <IOrderDetailUI>{
      salesPersonId: order?.salesPerson?.id ? order.salesPerson.id : null,
      orderDate: order?.orderDate ? new Date(order.orderDate) : null,
      deliveryDate: order?.deliveryDate ? new Date(order.deliveryDate) : null,
      orderStatus: order?.status?.code ? order.status.code : null,
      customerName: order?.customer?.name ? order.customer.name : null,
      customerSurname: order?.customer?.surname ? order.customer.surname : null,
      currency: order?.orderCurrency ? order.orderCurrency : null,
      orderAmount: order?.orderAmount ? order.orderAmount : null,
      vatAmount: order?.vatAmount ? order.vatAmount : null,
      totalOrderAmount: order?.totalOrderAmount ? order.totalOrderAmount : null,
    };
  }
}
