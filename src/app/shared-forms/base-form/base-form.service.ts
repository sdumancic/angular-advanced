import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BaseFormService implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  createForm() {
    this.form = this.fb.group({
      brand: new FormControl(''),
      model: new FormControl(''),
      vin: new FormControl(''),
    });
    return this.form;
  }
}
