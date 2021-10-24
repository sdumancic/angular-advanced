import { IOrderStatus } from '../order.model';

export const data: IOrderStatus[] = [
  {
    code: '01',
    description: 'Created',
  },
  {
    code: '02',
    description: 'Accepted',
  },
  {
    code: '03',
    description: 'Canceled',
  },
  {
    code: '12',
    description: 'Delivered',
  },
  { code: '09', description: 'Preparation' },
];
