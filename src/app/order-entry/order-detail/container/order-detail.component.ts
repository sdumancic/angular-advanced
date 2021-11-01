import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { OrderDetailFacadeService } from '../facade/order-detail-facade.service';
import { OrderDetailFormService } from '../presentation/order-detail-form.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrderDetailFormService],
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  private _orderId: number;
  form: FormGroup;
  private unsubscribe$ = new Subject();

  salesPersons$ = this.facade.salesPersons$();
  statuses$ = this.facade.statuses$();
  isLoading$ = this.facade.isLoading$();

  isDirty$() {
    return this.facade.isDirty$();
  }

  @Input() set orderId(value: number) {
    // if (this.stateHistory) {
    //   this.stateHistory.ignoreNext();
    // }
    if (value) {
      this.facade.startLoading();
      this.facade
        .init$(value)
        .pipe(take(1))
        .subscribe((orderDetailUi) => {
          this.form.patchValue(orderDetailUi);
          this.facade.finishLoading();
          this.facade.setDirtyCheckHead();
        });
      this._orderId = value;
      this.form.enable();
    }
  }

  get orderId() {
    return this._orderId;
  }

  constructor(
    private formService: OrderDetailFormService,
    private facade: OrderDetailFacadeService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.form = this.formService.buildForm();
    this.form.disable();
    this.form.valueChanges
      .pipe(takeUntil(this.unsubscribe$), distinctUntilChanged())
      .subscribe((formValues) => {
        this.facade.updateFormValue(formValues);
      });
  }

  onSalesPersonChanged(id: string) {
    this.facade
      .salesPerson$(id)
      .pipe(take(1))
      .subscribe((salesPerson) => {
        this.form.patchValue({
          salesPersonName: salesPerson.name,
          salesPersonLastname: salesPerson.surname,
        });
      });
  }

  reset() {
    const resettedValue = this.facade.reset();
    this.form.patchValue(resettedValue);
  }
}
