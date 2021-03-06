export const nodeTypes = [
  { value: 'object', viewValue: 'Object' },
  { value: 'technical-attributes', viewValue: 'Technical Attributes' },
  { value: 'string', viewValue: 'String' },
  { value: 'number', viewValue: 'Number' },
  { value: 'date', viewValue: 'Date' },
];

export const nodes = [
  {
    id: 'orders.id',
    key: 'orders.id',
    name: 'id',
    type: 'number',
    _dragAction: 'clone',
  },
  {
    id: 'orders.orderDate',
    key: 'orders.orderDate',
    name: 'orderDate',
    type: 'date',
    _dragAction: 'clone',
  },
  {
    id: 'orders.processDate',
    key: 'orders.processDate',
    name: 'processDate',
    type: 'date',
    _dragAction: 'clone',
  },
  {
    id: 'orders.orderStatus',
    key: 'orders.orderStatus',
    name: 'orderStatus',
    _dragAction: 'clone',
    type: 'object',
    children: [
      {
        id: 'orders.orderStatus.code',
        key: 'orders.orderStatus.code',
        name: 'code',
        type: 'string',
        _dragAction: 'clone',
      },
      {
        id: 'orders.orderStatus.value',
        key: 'orders.orderStatus.value',
        name: 'value',
        type: 'string',
        _dragAction: 'clone',
      },
    ],
  },
  {
    id: 'orders.customer',
    key: 'orders.customer',
    name: 'customer',
    type: 'object',
    _dragAction: 'clone',
    children: [
      {
        id: 'orders.customer.id',
        key: 'orders.customer.id',
        name: 'id',
        type: 'number',
        _dragAction: 'clone',
      },
      {
        id: 'orders.customer.name',
        key: 'orders.customer.name',
        name: 'name',
        type: 'string',
        _dragAction: 'clone',
      },
      {
        id: 'orders.customer.address',
        key: 'orders.customer.address',
        name: 'address',
        type: 'string',
        _dragAction: 'clone',
      },
      {
        id: 'orders.customer.city',
        key: 'orders.customer.city',
        name: 'city',
        type: 'string',
        _dragAction: 'clone',
      },
      {
        id: 'orders.customer.phones',
        key: 'orders.customer.phones',
        name: 'phones',
        type: 'array',
        _dragAction: 'clone',
        children: [
          {
            id: 'orders.customer.phones.value',
            key: 'orders.customer.phones.value',
            name: 'value',
            type: 'string',
            _dragAction: 'clone',
          },
        ],
      },
    ],
  },
  {
    id: 'orders.items',
    key: 'orders.items',
    name: 'items',
    type: 'object',
    _dragAction: 'clone',
    children: [
      {
        id: 'orders.items.id',
        key: 'orders.items.id',
        name: 'id',
        type: 'number',
        _dragAction: 'clone',
      },
      {
        id: 'orders.items.price',
        key: 'orders.items.price',
        name: 'price',
        type: 'number',
        _dragAction: 'clone',
      },
      {
        id: 'orders.items.name',
        key: 'orders.items.name',
        name: 'name',
        type: 'string',
        _dragAction: 'clone',
      },
    ],
  },
  {
    id: 'orders.orderTotal',
    key: 'orders.orderTotal',
    name: 'orderTotal',
    type: 'number',
    _dragAction: 'clone',
  },
];
