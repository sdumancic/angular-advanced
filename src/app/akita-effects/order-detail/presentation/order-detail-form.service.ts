import { FormBuilder, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderDetailFormService {

  constructor(private fb: FormBuilder) { }

  buildForm() {
    return this.fb.group({
      id: new FormControl({value: null, disabled:true}),
      orderDate: new FormControl(),
      deliveryDate: new FormControl(),
      salesPersonId: new FormControl(),
      salesPersonName: new FormControl({value: null, disabled:true}),
      salesPersonLastname: new FormControl({value: null, disabled:true}),
      statusCode: new FormControl(),
      statusDescription: new FormControl({value: null, disabled:true}),
      customerId: new FormControl(),
      customerName: new FormControl({value: null, disabled:true}),
      customerSurname: new FormControl({value: null, disabled:true}),
      vatId: new FormControl(),
      vatName: new FormControl({value: null, disabled:true}),
      vatPercentage: new FormControl({value: null, disabled:true}),
      orderCurrency: new FormControl(),
      orderAmount: new FormControl({value: null, disabled:true}),
      vatAmount: new FormControl({value: null, disabled:true}),
      totalOrderAmount: new FormControl({value: null, disabled:true})
    })
  }
}
