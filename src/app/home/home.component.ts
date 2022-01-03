import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IGlobalState } from '../global-state.model';
import { PoolingService } from '../pooling/pooling.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;

  streetValidators = [Validators.required, Validators.minLength(5)];
  cityValidators = [Validators.required, Validators.minLength(5)];
  countryValidators = [Validators.required];

  constructor(
    public poolingService: PoolingService,
    public globalStateService: StateService<IGlobalState>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.globalStateService.setState({
      username: 'CHAED0H',
    });
    this.poolingService.log();

    this.form = this.fb.group({
      first: new FormControl({ value: '', disabled: false }),
      second: new FormControl(),
      third: new FormControl(),
      fourth: new FormControl(''),
      address: new FormControl(''),
    });
  }
}
