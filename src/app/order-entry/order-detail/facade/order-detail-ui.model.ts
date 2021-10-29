export interface IOrderDetailUI {
  salesPersonId: string;
  orderDate: Date;
  deliveryDate: Date;
  orderStatus: string;
  customerName: string;
  customerSurname: string;
  currency: string;
  orderAmount: number;
  vatAmount: number;
  totalOrderAmount: number;
}
