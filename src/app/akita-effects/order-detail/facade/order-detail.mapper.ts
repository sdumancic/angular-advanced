import { IOrder } from '../../data-access/order.model';
import { IOrderDetailUI } from './order-detail-ui.model';

export class OrderDetailMapper {
  static fromResourceToOrderDetailUI(order: IOrder): IOrderDetailUI {
    return <IOrderDetailUI>{
      salesPersonId: order.salesPerson.id,
      orderDate: new Date(order.orderDate),
      deliveryDate: new Date(order.deliveryDate),
      orderStatus: order.status.code,
      customerName: order.customer.name,
      customerSurname: order.customer.surname,
      currency: order.orderCurrency,
      orderAmount: order.orderAmount,
      vatAmount: order.vatAmount,
      totalOrderAmount: order.totalOrderAmount,
    };
  }
}
