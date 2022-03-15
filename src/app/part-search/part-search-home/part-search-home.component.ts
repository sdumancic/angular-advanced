import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-part-search-home',
  templateUrl: './part-search-home.component.html',
  styleUrls: ['./part-search-home.component.scss'],
})
export class PartSearchHomeComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      name: ['', { validators: [Validators.required], updateOn: 'blur' }],
      partOne: new FormControl('', Validators.required),
      partTwo: new FormControl('', Validators.required),
      description: ['', { updateOn: 'blur' }],
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((values) => {
      console.log(
        'PartSearchHomeComponent.valueChanges ',
        JSON.stringify(this.form.value)
      );
    });
  }
}
