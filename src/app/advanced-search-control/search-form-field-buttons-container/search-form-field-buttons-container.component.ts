import {
  Component,
  DoCheck,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  NG_VALIDATORS,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-form-field-buttons-container',
  templateUrl: './search-form-field-buttons-container.component.html',
  styleUrls: ['./search-form-field-buttons-container.component.scss'],
})
export class SearchFormFieldButtonsContainerComponent
  implements OnInit, ControlValueAccessor, DoCheck, OnDestroy
{
  @Input() type: 'number' | 'text' = 'text';
  form: FormGroup;
  disabled: boolean;

  onChange = (val: any) => {};
  onTouched = () => {};

  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    @Self() public controlDirective: NgControl,
    @Optional() @Self() @Inject(NG_VALIDATORS) validators: any[]
  ) {
    this.controlDirective && (this.controlDirective.valueAccessor = this);
    this.form = this.fb.group({
      val: new FormControl(),
    });
  }

  ngOnInit(): void {
    const validator = this.controlDirective.control.validator;
    this.valControl.setValidators(validator);
    this.form.updateValueAndValidity();

    this.controlDirective.control.setValidators(this.validate.bind(this));
  }

  get valControl() {
    return this.form.get('val') as FormControl;
  }

  ngDoCheck(): void {
    if (this.controlDirective.touched) {
      this.valControl.markAsTouched();
    }
  }

  writeValue(value: any): void {
    value === null
      ? this.form.reset()
      : this.form.patchValue(value, {
          emitEvent: false,
        });
  }
  registerOnChange(fn: any): void {
    this.form.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  validate(control: AbstractControl) {
    if (this.form.valid) {
      return null;
    }
    let errors: any = {};
    errors = this.addControlErrors(errors, 'val');
    return errors;
  }

  addControlErrors(allErrors: any, controlName: string) {
    const errors = { ...allErrors };
    const controlErrors = this.form.controls[controlName].errors;
    if (controlErrors) {
      errors[controlName] = controlErrors;
    }
    return errors;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

function AdvancedSearchValidator(control: FormControl) {
  return control.value.scope !== null && control.value.query !== ''
    ? null
    : { validateSearch: { valid: null } };
}
