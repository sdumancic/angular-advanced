export interface IOrderItem {
  id: number;
  orderId: number;
  productGroup: IProductGroup;
  product: IProduct;
  amount: number;
  vatAmount: number;
  totalAmount: number;
  quantity: number;
}

export interface IProductGroup {
  code: string;
  name: string;
}

export interface IProduct {
  code: string;
  name: string;
  price?: number;
  productGroupCode?: string;
}
