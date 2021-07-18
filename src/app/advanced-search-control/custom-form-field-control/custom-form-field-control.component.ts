import { FocusMonitor } from '@angular/cdk/a11y';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import {
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgControl,
  NgForm,
  NG_VALIDATORS,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import { OperatorOptions } from './operator-options';

export interface FormFieldValue {
  query: string;
  scope: string;
}

export class CustomErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm
  ): boolean {
    return control.dirty && control.invalid;
  }
}

@Component({
  selector: 'app-custom-form-field-control',
  templateUrl: './custom-form-field-control.component.html',
  styleUrls: ['./custom-form-field-control.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomFormFieldControlComponent,
    },
    {
      provide: ErrorStateMatcher,
      useClass: CustomErrorMatcher,
    },
  ],
})
export class CustomFormFieldControlComponent
  implements
    OnInit,
    OnDestroy,
    MatFormFieldControl<FormFieldValue>,
    ControlValueAccessor
{
  private unsubscribe$ = new Subject<void>();
  static nextId = 0;
  @ViewChild(MatInput, { read: ElementRef, static: true }) input: ElementRef;
  @Input()
  set value(val: FormFieldValue) {
    this.form.patchValue(val);
    this.stateChanges.next();
  }
  get value() {
    return this.form.value;
  }

  @Input() type: 'text' | 'number' = 'text';

  stateChanges = new Subject<void>();

  @HostBinding()
  id = `custom-form-field-id-${CustomFormFieldControlComponent.nextId++}`;

  @Input() set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  get placeholder() {
    return this._placeholder;
  }

  focused: boolean = false;
  get empty(): boolean {
    return !this.value.query && !this.value.scope;
  }

  @HostBinding('class.floated')
  get shouldLabelFloat(): boolean {
    return true;
  }
  @Input() required: boolean;

  @Input() disabled: boolean;

  get errorState() {
    const matcher = this.errorStateMatcher || this.errorMatcher;
    return matcher.isErrorState(this.ngControl.control as FormControl, null);
  }
  controlType = 'custom-form-field';

  @Input() errorStateMatcher: ErrorStateMatcher;

  @Input()
  autofilled?: boolean;

  @HostBinding('attr.aria-describedby')
  userAriaDescribedBy = '';

  onChange: (value: FormFieldValue) => void;
  onTouch: () => void;

  form: FormGroup;

  constructor(
    private focusMonitor: FocusMonitor,
    @Optional() @Self() public ngControl: NgControl,
    private fb: FormBuilder,
    private errorMatcher: ErrorStateMatcher,
    @Optional() @Self() @Inject(NG_VALIDATORS) validators: any[]
  ) {
    if (ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
    this.form = this.fb.group({
      scope: new FormControl({ value: 'gt' }),
      query: new FormControl(''),
    });
  }

  writeValue(value: FormFieldValue): void {
    value === null
      ? this.form.reset()
      : this.form.patchValue(value, {
          emitEvent: false,
        });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
    this.stateChanges.next();
  }

  setDescribedByIds(ids: string[]): void {
    this.userAriaDescribedBy = ids.join(' ');
  }
  onContainerClick(event: MouseEvent): void {
    this.focusMonitor.focusVia(this.input, 'program');
  }

  get scopeControl() {
    return this.form.get('scope') as FormControl;
  }

  get queryControl() {
    return this.form.get('query') as FormControl;
  }

  ngOnInit(): void {
    this.form.patchValue({ scope: 'equals' });
    const validator = this.ngControl.control.validator;
    this.scopeControl.setValidators(validator);
    this.queryControl.setValidators(validator);
    this.form.updateValueAndValidity();

    this.ngControl.control.setValidators(this.validate.bind(this));

    this.focusMonitor.monitor(this.input).subscribe((focused) => {
      this.focused = !!focused;
      this.stateChanges.next();
    });

    this.focusMonitor
      .monitor(this.input)
      .pipe(take(1))
      .subscribe(() => {
        this.onTouch();
      });
    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => this.onChange(value));
  }

  validate(control: AbstractControl) {
    if (this.form.valid) {
      return null;
    }
    let errors: any = {};
    errors = this.addControlErrors(errors, 'scope');
    errors = this.addControlErrors(errors, 'query');
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

  onSelectedValueChanged() {
    console.log('setting focus to input');
    this.focusMonitor.focusVia(this.input, 'program');
  }

  getDomainOptions() {
    if (this.type === 'number') return OperatorOptions.numberOptions;
    return OperatorOptions.textOptions;
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.input);
    this.stateChanges.complete();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
