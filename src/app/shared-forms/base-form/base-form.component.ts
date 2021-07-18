import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseFormFacadeService } from './base-form-facade.service';
import { BaseFormService } from './base-form.service';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss'],
})
export class BaseFormComponent implements OnInit {
  form: FormGroup;
  constructor(
    private baseFormService: BaseFormService,
    private facade: BaseFormFacadeService
  ) {}

  ngOnInit(): void {
    this.form = this.baseFormService.createForm();
  }

  onClick() {
    this.facade.search(this.form.value);
  }
}
