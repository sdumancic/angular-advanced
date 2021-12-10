const orders = [
  {
    id: 1,
    orderDate: '2021-05-07',
    processDate: '2021-06-07',
    orderStatus: {
      code: '7',
      value: 'Processing',
    },
    customer: {
      id: 1234,
      name: 'ALFKI Industries',
      address: 'Street 1',
      city: 'Zagreb',
      phones: [{ value: '123-456-789' }, { value: '123-456-111' }],
    },
    items: [
      { id: 12, price: 122.0, name: 'Name 1' },
      { id: 11, price: 142.0, name: 'Name 2' },
    ],
    orderTotal: 264.0,
  },
];
