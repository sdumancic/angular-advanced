export interface IOrder {
  id: number;
  orderDate: Date;
  deliveryDate:  Date;
  salesPerson: ISalesPerson;
  status: IOrderStatus;
  customer: ICustomer;
  vat : IVat;
  orderCurrency: string;
  orderAmount: number;
  vatAmount: number;
  totalOrderAmount: number;
}

export interface IVat {
  id: number;
  name: string;
  percentage: number;
}
export interface ICustomer {
  id: string;
  name: string;
  surname: string;
}

export interface IOrderStatus {
  code: string;
  description: string;
}
export interface ISalesPerson {
  id: string;
  name: string;
  surname: string;
}
