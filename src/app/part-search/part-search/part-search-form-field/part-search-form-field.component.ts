import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
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
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MatFormField,
  MatFormFieldControl,
  MAT_FORM_FIELD,
} from '@angular/material/form-field';
import { Observable, Subject } from 'rxjs';

export interface IPartSearchFormFieldValue {
  franchiseCode: string;
  partNumber: string;
  partDescription: string;
}

/*
https://material.angular.io/guide/creating-a-custom-form-field-control
*/
@Component({
  selector: 'app-part-search-form-field',
  templateUrl: './part-search-form-field.component.html',
  styleUrls: ['./part-search-form-field.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: PartSearchFormFieldComponent,
    },
  ],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  },
})
export class PartSearchFormFieldComponent
  implements
    OnInit,
    OnDestroy,
    MatFormFieldControl<IPartSearchFormFieldValue>,
    ControlValueAccessor
{
  static nextId = 0;
  @ViewChild('franchiseCode') franchiseCodeSelect: HTMLSelectElement;
  @ViewChild('partNumber') partNumberInput: HTMLInputElement;
  @ViewChild('partDescription') partDescriptionInput: HTMLInputElement;

  partSearchForm: FormGroup;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.partSearchForm = this.fb.group({
      franchiseCode: [null, { validators: [Validators.required] }],
      partNumber: [
        null,
        {
          validators: [Validators.required, Validators.minLength(3)],
          updateOn: 'blur',
        },
      ],
      partDescription: ['', { updateOn: 'blur' }],
    });
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange = (_: any) => {};
  onTouched = () => {};

  /* MatFormFieldInterface */

  @Input()
  get value(): IPartSearchFormFieldValue | null {
    if (this.partSearchForm.valid) {
      const {
        value: { franchiseCode, partNumber, partDescription },
      } = this.partSearchForm;
      return {
        franchiseCode,
        partNumber,
        partDescription,
      } as IPartSearchFormFieldValue;
    }
    return null;
  }
  set value(part: IPartSearchFormFieldValue | null) {
    const { franchiseCode, partNumber, partDescription } =
      part ||
      ({
        franchiseCode: '',
        partNumber: '',
        partDescription: '',
      } as IPartSearchFormFieldValue);
    this.partSearchForm.setValue({
      franchiseCode,
      partNumber,
      partDescription,
    });
    this.stateChanges.next();
  }

  stateChanges = new Subject<void>();
  id: string = `part-search-form-field-${PartSearchFormFieldComponent.nextId++}`;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  focused: boolean = false;
  touched: boolean = false;

  get empty() {
    const {
      value: { franchiseCode, partNumber, partDescription },
    } = this.partSearchForm;

    return !franchiseCode && !partNumber && !partDescription;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled
      ? this.partSearchForm.disable()
      : this.partSearchForm.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  get errorState(): boolean {
    return this.partSearchForm.invalid && this.touched;
  }

  controlType: string = 'part-search-form-field';
  autofilled?: boolean;

  @Input('aria-describedby') userAriaDescribedBy: string;

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.part-search-container'
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.partSearchForm.controls.franchiseCode.valid) {
      this._focusMonitor.focusVia(this.partNumberInput, 'program');
    } else {
      this._focusMonitor.focusVia(this.franchiseCodeSelect, 'program');
    }
  }
  /* MatFormFieldInterface */

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  autoFocusNext(
    control: AbstractControl,
    nextElement?: HTMLInputElement
  ): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  /* ControlValueAccessor */
  writeValue(val: IPartSearchFormFieldValue | null): void {
    this.value = val;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  /* ControlValueAccessor */

  ngOnInit(): void {}

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
    this.stateChanges.complete();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
