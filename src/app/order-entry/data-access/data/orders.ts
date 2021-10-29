import { IOrder } from '../order.model';

export const data: IOrder[] = [
  {
    id: 1,
    orderDate: new Date('2020-01-01'),
    deliveryDate: new Date('2020-01-05'),
    salesPerson: {
      id: 'ERZ122',
      name: 'John',
      surname: 'Doe',
    },
    status: {
      code: '12',
      description: 'Delivered',
    },
    customer: {
      id: 'SD01',
      name: 'Sanjin',
      surname: 'Dumancic',
    },
    vat: {
      id: 1,
      name: 'regular vat',
      percentage: 18,
    },
    orderCurrency: 'CHF',
    orderAmount: 1245.65,
    vatAmount: 122.23,
    totalOrderAmount: 1400.0,
  },
  {
    id: 2,
    orderDate: new Date('2020-01-02'),
    deliveryDate: new Date('2020-01-06'),
    salesPerson: {
      id: 'GSD13',
      name: 'Jane',
      surname: 'Doe',
    },
    status: {
      code: '12',
      description: 'Delivered',
    },
    customer: {
      id: 'AA01',
      name: 'Albert',
      surname: 'Einstein',
    },
    vat: {
      id: 1,
      name: 'regular vat',
      percentage: 18,
    },
    orderCurrency: 'CHF',
    orderAmount: 1000.0,
    vatAmount: 180.0,
    totalOrderAmount: 1180.0,
  },
  {
    id: 3,
    orderDate: new Date('2020-01-05'),
    deliveryDate: null,
    salesPerson: {
      id: 'GSD13',
      name: 'Jane',
      surname: 'Doe',
    },
    status: {
      code: '09',
      description: 'Preparation',
    },
    customer: {
      id: 'AA01',
      name: 'Albert',
      surname: 'Einstein',
    },
    vat: {
      id: 1,
      name: 'regular vat',
      percentage: 18,
    },
    orderCurrency: 'CHF',
    orderAmount: 1000.0,
    vatAmount: 180.0,
    totalOrderAmount: 1180.0,
  },
];
