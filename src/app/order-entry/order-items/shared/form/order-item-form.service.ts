import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { IOrderItemsSearchResultsUI } from '../../overview/presentation/order-items-search-results/order-items-search-results-ui.model';

@Injectable()
export class OrderItemFormService {
  constructor(private fb: FormBuilder) {}

  buildForm(orderId: number, orderItem?: IOrderItemsSearchResultsUI) {
    return this.fb.group({
      id: new FormControl({
        value: orderItem ? orderItem.id : null,
        disabled: true,
      }),
      orderId: new FormControl({ value: orderId, disabled: true }),
      productGroupCode: new FormControl(
        orderItem ? orderItem.productGroupCode : null,
        Validators.compose([Validators.required])
      ),
      productGroupName: new FormControl(
        orderItem ? orderItem.productGroupName : null
      ),
      productCode: new FormControl(
        orderItem ? orderItem.productCode : null,
        Validators.compose([Validators.required])
      ),
      productName: new FormControl(orderItem ? orderItem.productName : null),
      amount: new FormControl(
        orderItem ? orderItem.amount : null,
        Validators.compose([Validators.required])
      ),
      vatAmount: new FormControl({
        value: orderItem ? orderItem.vatAmount : null,
        disabled: true,
      }),
      quantity: new FormControl(
        orderItem ? orderItem.quantity : 1,
        Validators.compose([Validators.required])
      ),
      totalAmount: new FormControl({
        value: orderItem ? orderItem.totalAmount : null,
        disabled: true,
      }),
    });
  }
}
