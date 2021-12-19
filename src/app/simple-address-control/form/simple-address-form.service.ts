import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class SimpleAddressFormService {
  constructor(private fb: FormBuilder) {}

  form: FormGroup;

  createAddressForm() {
    this.form = this.fb.group({
      street: new FormControl(''),
      city: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
    });
    return this.form;
  }
}
