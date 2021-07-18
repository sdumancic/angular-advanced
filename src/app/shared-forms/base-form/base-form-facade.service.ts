import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class BaseFormFacadeService implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  search(values) {
    console.log('executing search with values ', values);
  }
}
