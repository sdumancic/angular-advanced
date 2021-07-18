import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupName,
} from '@angular/forms';
import { BaseFormService } from '../base-form.service';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.scss'],
})
export class ChildFormComponent implements OnInit {
  form: FormGroup;
  constructor(private baseService: BaseFormService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      base: this.baseService.createForm(),
      partNumber: new FormControl(''),
    });
  }
}
