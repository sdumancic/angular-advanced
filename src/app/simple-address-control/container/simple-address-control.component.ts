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
  FormGroup,
  NgControl,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
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
  implements OnInit, ControlValueAccessor, Validator, DoCheck
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

  ngDoCheck(): void {
    if (this.controlDirective.touched) {
      this.addressForm.markAsTouched();
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    if (this.addressForm.controls['street'].hasError('required')) {
      this.addressForm.setErrors({
        ...this.addressForm.errors,
        streetRequired: true,
      });
    }
    if (this.addressForm.controls['city'].hasError('required')) {
      this.addressForm.setErrors({
        ...this.addressForm.errors,
        cityRequired: true,
      });
    }
    if (this.addressForm.controls['country'].hasError('required')) {
      this.addressForm.setErrors({
        ...this.addressForm.errors,
        countryRequired: true,
      });
    }
    if (this.addressForm.controls['street'].hasError('minlength')) {
      this.addressForm.setErrors({
        ...this.addressForm.errors,
        streetMinlength: true,
      });
    }
    if (this.addressForm.controls['city'].hasError('minlength')) {
      this.addressForm.setErrors({
        ...this.addressForm.errors,
        cityMinlength: true,
      });
    }

    return this.addressForm.valid
      ? null
      : {
          invalidForm: { valid: false, message: 'Address fields are invalid' },
        };
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
    this.addressForm.get('street').updateValueAndValidity();
  }

  onCityInputBlur(): void {
    this.addressForm.get('city').updateValueAndValidity();
  }

  isControlInvalid() {
    if (!this.controlDirective) {
      return false;
    }

    if (!this.addressForm.valid && this.addressForm.touched) {
      return true;
    } else {
      return false;
    }
  }
}
