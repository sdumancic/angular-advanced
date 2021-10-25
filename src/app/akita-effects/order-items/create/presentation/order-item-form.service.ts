import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderItemFormService {
  constructor(private fb: FormBuilder) {}

  buildForm() {
    return this.fb.group({
      id: new FormControl({ value: null, disabled: true }),
      orderId: new FormControl({ value: null, disabled: true }),
      productGroup: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      product: new FormControl(null, Validators.compose([Validators.required])),
      amount: new FormControl(null, Validators.compose([Validators.required])),
      vatAmount: new FormControl({ value: null, disabled: true }),
      quantity: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      totalAmount: new FormControl({ value: null, disabled: true }),
    });
  }
}
