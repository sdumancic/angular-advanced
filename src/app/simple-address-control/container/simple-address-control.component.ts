import {
  Component,
  DoCheck,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgControl,
  NgForm,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import { ICountry, IState } from '../data-access/Country.model';
import { SimpleAddressFacadeService } from '../facade/simple-address-facade.service';
import { SimpleAddressFormService } from '../form/simple-address-form.service';

@Component({
  selector: 'app-simple-address-control',
  templateUrl: './simple-address-control.component.html',
  styleUrls: ['./simple-address-control.component.scss'],
  providers: [SimpleAddressFacadeService, SimpleAddressFormService],
})
export class SimpleAddressControlComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @Input() readonly = false;
  @Input() streetValidators: ValidatorFn | ValidatorFn[];
  @Input() cityValidators: ValidatorFn | ValidatorFn[];
  @Input() countryValidators: ValidatorFn | ValidatorFn[];
  public addressForm: FormGroup;

  countries$: Observable<ICountry[]> = this.facade.countries$;
  states$: Observable<IState[]>;

  errors: ValidationErrors;

  constructor(
    @Self() @Optional() private controlDirective: NgControl,
    private facade: SimpleAddressFacadeService
  ) {
    controlDirective && (controlDirective.valueAccessor = this);
    this.addressForm = this.facade.createAddressForm();
  }

  ngOnInit(): void {
    const parentValidator = this.controlDirective.control.validator;
    this.facade.streetControl().setValidators(this.streetValidators);
    this.facade.cityControl().setValidators(this.cityValidators);
    this.facade.countryControl().setValidators(this.countryValidators);

    this.controlDirective.control.setValidators([this.validate.bind(this)]);
    this.controlDirective.control.updateValueAndValidity();
  }

  public onTouched: () => void = () => {};

  onValidatorChange = () => {};

  writeValue(val: any): void {
    val && this.addressForm.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.addressForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.addressForm.disable() : this.addressForm.enable();
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    let errors: any = {};

    console.log('validate ', this.addressForm.controls['street'].errors);

    if (this.addressForm.controls['street'].hasError('required')) {
      errors.streetRequired = true;
    }
    if (this.addressForm.controls['city'].hasError('required')) {
      errors.cityRequired = true;
    }
    if (this.addressForm.controls['country'].hasError('required')) {
      errors.countryRequired = true;
    }
    if (this.addressForm.controls['street'].hasError('minlength')) {
      errors.streetMinlength = true;
    }
    if (this.addressForm.controls['city'].hasError('minlength')) {
      errors.cityMinlength = true;
    }
    console.log('validate ', errors);
    return errors;
  }

  public get invalid(): boolean {
    return this.controlDirective ? this.controlDirective.invalid : false;
  }

  streetErrors() {
    if (this.addressForm.controls['street'].touched)
      return this.addressForm.controls['street'].errors;
  }

  cityErrors() {
    if (this.addressForm.controls['city'].touched)
      return this.addressForm.controls['city'].errors;
  }

  countryErrors() {
    if (this.addressForm.controls['country'].touched)
      return this.addressForm.controls['country'].errors;
  }

  onCountryChanged() {
    this.states$ = this.facade.loadStates$(
      this.addressForm.get('country').value
    );
  }

  onStreetInputBlur(): void {
    this.onTouched();
    this.onValidatorChange();
    this.addressForm.get('street').updateValueAndValidity();
  }

  onCityInputBlur(): void {
    this.onTouched();
    this.onValidatorChange();
    this.addressForm.get('city').updateValueAndValidity();
  }

  onClosed() {
    this.onTouched();
    this.onValidatorChange();
    this.addressForm.get('street').markAsTouched();
    this.addressForm.get('city').markAsTouched();
    this.addressForm.get('country').updateValueAndValidity();
  }

  isControlInvalid() {
    if (!this.controlDirective) {
      return false;
    }
    if (
      (!this.addressForm.get('street').valid &&
        this.addressForm.get('street').touched) ||
      (!this.addressForm.get('city').valid &&
        this.addressForm.get('city').touched) ||
      (!this.addressForm.get('country').valid &&
        this.addressForm.get('country').touched)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
