import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {take} from "rxjs/operators";

@Component({
  selector: 'app-part-search-home',
  templateUrl: './part-search-home.component.html',
  styleUrls: ['./part-search-home.component.scss'],
})
export class PartSearchHomeComponent implements OnInit {
  form: FormGroup;
  partRequired: boolean = true;
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: [null, { validators: [Validators.required], updateOn: 'blur' }],
      partOne: new FormControl(null, Validators.required),
      partTwo: new FormControl(null, Validators.required),
      description: [null, { updateOn: 'blur' }],
    });

  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((values) => {
      console.log(
        'PartSearchHomeComponent.valueChanges ',
        JSON.stringify(this.form.value)
      );
    });


/*
    setTimeout(() => {
      console.log('setting part to optional')
      //this.form.get('partOne').clearValidators();
      this.partRequired = false;

      this.form.patchValue({
        name: 'test name2',
        partOne: {
          franchiseCode: '91',
          partNumber: '1234-567',
          partDescription: 'Test'
        },
      }, {emitEvent: false})

    },5000)
  */
  }

  clearValidator() {
    this.form.get('partOne').clearValidators();
  }

  patchValue() {
    this.form.patchValue({
      name: 'test name2',
      partOne: {
        franchiseCode: '91',
        partNumber: '1234-567',
        partDescription: 'Test'
      },
    }, {emitEvent: false})

  }
}
