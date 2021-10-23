import { IOrderItem } from './../order-items.model';

export const data: IOrderItem[] = [
  {
    id: 1,
    orderId: 1,
    productGroup: {
      code: 'CA',
      name: 'Computer accessories'
    },
    product: {
      code: 'ASDAS123ASF',
      name: 'IPAD 12.9 512GB'
    },
    amount: 100,
    vatAmount: 18,
    totalAmount: 118.00
  },
  {
    id: 2,
    orderId: 1,
    productGroup: {
      code: 'CH',
      name: 'Computer hardware'
    },
    product: {
      code: 'FDSF34FD',
      name: 'Asus Monitor 28 inch'
    },
    amount: 1000,
    vatAmount: 18,
    totalAmount: 1180.00
  },
  {
    id: 3,
    orderId: 1,
    productGroup: {
      code: 'CS',
      name: 'Computer software'
    },
    product: {
      code: 'WIN123',
      name: 'Windows 10'
    },
    amount: 100,
    vatAmount: 18,
    totalAmount: 118.00
  },
  {
    id: 4,
    orderId: 1,
    productGroup: {
      code: 'CA',
      name: 'Computer accessories'
    },
    product: {
      code: 'MOUS123',
      name: 'Logitech Master MX 3'
    },
    amount: 100,
    vatAmount: 18,
    totalAmount: 118.00
  }
]
