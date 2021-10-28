import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderDetailFormService {
  constructor(private fb: FormBuilder) {}

  buildForm() {
    return this.fb.group({
      id: new FormControl({ value: null, disabled: true }),
      orderDate: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      deliveryDate: new FormControl(),
      salesPersonId: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      orderStatus: new FormControl(
        null,
        Validators.compose([Validators.required])
      ),
      customerName: new FormControl({ value: null, disabled: false }),
      customerSurname: new FormControl({ value: null, disabled: false }),
      orderCurrency: new FormControl({ value: 'HRK', disabled: true }),
      orderAmount: new FormControl({ value: null, disabled: true }),
      vatAmount: new FormControl({ value: null, disabled: true }),
      totalOrderAmount: new FormControl({ value: null, disabled: true }),
    });
  }
}
