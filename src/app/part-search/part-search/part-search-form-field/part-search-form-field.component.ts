import {FocusMonitor} from '@angular/cdk/a11y';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
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
  NgControl,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl,} from '@angular/material/form-field';
import {Observable, of, Subject} from 'rxjs';
import {distinctUntilChanged, map, switchMap, takeUntil, tap} from "rxjs/operators";
import {PartSearchService} from "./part-search.service";

export interface IPartSearchFormFieldValue {
  franchiseCode: string;
  partNumber: string;
  partDescription?: string;
}

/*
https://material.angular.io/guide/creating-a-custom-form-field-control
*/
@Component({
  selector: 'app-part-search-form-field',
  templateUrl: './part-search-form-field.component.html',
  styleUrls: ['./part-search-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
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
    ControlValueAccessor, Validator
{
  static nextId = 0;
  @ViewChild('franchiseCode') franchiseCodeSelect: HTMLSelectElement;
  @ViewChild('partNumber') partNumberInput: HTMLInputElement;
  @ViewChild('partDescription') partDescriptionInput: HTMLInputElement;

  partSearchForm: FormGroup;
  franchiseCodes$ = of([{code: '91',value:'91'},{code: '92',value:'92'},{code: '95',value:'95'}]);

  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
    private partService: PartSearchService
  ) {
    this.partSearchForm = this.fb.group({
      franchiseCode: [null, {validators: Validators.required}],
      partNumber: [
        null,
        {
          validators: [Validators.required, Validators.minLength(3)],
          updateOn: 'blur',
        },
      ],
      partDescription: new FormControl({value:null, disabled: true}),
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
    return {
      franchiseCode : '91',
      partNumber: null,
      partDescription: null,
    } as IPartSearchFormFieldValue;
  }
  set value(part: IPartSearchFormFieldValue | null) {

    const { franchiseCode, partNumber, partDescription } =
      part ||
      ({
        franchiseCode: '91',
        partNumber: null,
        partDescription: null,
      } as IPartSearchFormFieldValue);
    this.partSearchForm.patchValue({
      franchiseCode,
      partNumber,
      partDescription,
    }, {emitEvent: false});

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

  @HostBinding('class.floating')
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
    //this.onChange = fn;

    // TODO: Should CVA emit values if form is invalid, currently it does
    this.partSearchForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        distinctUntilChanged(),
        switchMap((formValue) => {
          return this.validSearch({
            franchiseCode: formValue.franchiseCode,
            partNumber:  formValue.partNumber
          })
            ? this.searchPart$(formValue.franchiseCode,formValue.partNumber )
            : of(this.partSearchForm.getRawValue());
        })
      )
      .subscribe(fn);

  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  /* ControlValueAccessor */


  ngOnInit(): void {
    const validator = this.ngControl.control.validator(
      {} as AbstractControl
    );
    this.ngControl.control.setValidators(this.validate.bind(this));
    this.partSearchForm.get('franchiseCode').setValue('91', {emitEvent:false});

  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    //this.autoFocusNext(control, nextElement);
    //this.onChange(this.value);
  }

  validate(ctrl: AbstractControl): ValidationErrors | null {
    return this.ngControl.errors;
  }

  private validSearch = (values: IPartSearchFormFieldValue) => {
    console.log(values);

    const valid = values.franchiseCode !== null && values.partNumber !==null;
    console.log('valid search= ', valid);
    return values.franchiseCode !== null && values.partNumber !==null;
  };

  private searchPart$(franchiseCode: string, partNumber: string): Observable<IPartSearchFormFieldValue | null> {

    return this.partService
      .search(
        franchiseCode,
        partNumber.toUpperCase()
      )
      .pipe(
        tap((part: IPartSearchFormFieldValue) => {
          this.afterPartSearch(part);
        })
      );
  }

  private afterPartSearch(part: IPartSearchFormFieldValue): void {

    if (part === null) {
      this.setPartNotFoundError();
    } else {
      this.value = part;
      this.clearPartNotFoundError();
    }
  }

  private setPartNotFoundError(): void {
    this.partSearchForm.patchValue({partDescription: null}, {emitEvent: false})
    this.partSearchForm.setErrors({
      ...this.partSearchForm.errors,
      partNotFound: true
    });
  }

  private clearPartNotFoundError(): void {

    this.partSearchForm.setErrors(null);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
    this.stateChanges.complete();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  formErrors() {
    return this.partSearchForm.errors;
  }

  controlErrors() {
    return this.ngControl.errors;
  }


  get errors(): string[] {
    const result: string[] = [];
    if (
      this.partSearchForm.invalid &&
      this.partSearchForm.touched
    ) {
      if (this.ngControl.errors) {
        Object.keys(this.ngControl.errors).forEach(keyError => {
          result.push(keyError);
        });
      }
      if (this.partSearchForm.errors) {
        Object.keys(this.partSearchForm.errors).forEach(keyError => {
          result.push(keyError);
        });
      }
    }
    console.log(result)
    return result;
  }
}
