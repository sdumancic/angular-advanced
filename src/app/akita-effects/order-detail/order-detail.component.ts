import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormGroupName } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { IOrder } from '../data-access/order.model';
import { OrderDetailFacadeService } from './facade/order-detail-facade.service';
import { OrderDetailMapper } from './facade/order-detail.mapper';
import { OrderDetailFormService } from './presentation/order-detail-form.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrderDetailFacadeService, OrderDetailFormService],
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  private _order: IOrder;
  form: FormGroup;
  private unsubscribe$ = new Subject();

  //salesPersons$ = this.facade.salesPersons$();
  //statuses$ = this.facade.statuses$();

  get order() {
    return this._order;
  }

  @Input()
  set order(value: IOrder) {
    if (this._order !== value) {
      this._order = value;
      if (value) {
        this.form.patchValue(
          OrderDetailMapper.fromResourceToOrderDetailUI(value)
        );
      }
    }
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
}
