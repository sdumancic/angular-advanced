import {Component, Input, OnDestroy, OnInit, Optional, Self} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from "@angular/forms";
import {of, Subject} from "rxjs";
import {delay, distinctUntilChanged, switchMap, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-part-search-container',
  templateUrl: './part-search-container.component.html',
  styleUrls: ['./part-search-container.component.scss']
})
export class PartSearchContainerComponent implements ControlValueAccessor, OnDestroy {

  @Input() required = false;
  ctrl: FormControl;
  private unsubscribe$ = new Subject();
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};

  constructor(@Optional() @Self() public controlDirective: NgControl) {
    this.controlDirective && (this.controlDirective.valueAccessor = this);
    this.ctrl = new FormControl();
  }

  writeValue(value: any): void {
    value === null
      ? this.ctrl.reset()
      : this.ctrl.patchValue(value, {
        emitEvent: false
      });
  }
  registerOnChange(fn: any): void {

    this.ctrl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        distinctUntilChanged(),
        delay(0)
      )
      .subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.ctrl.disable();
    } else {
      this.ctrl.enable();
    }
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
