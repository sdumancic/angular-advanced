import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupName } from '@angular/forms';
import { take } from 'rxjs/operators';
import { IOrder } from '../data-access/order.model';
import { OrderDetailFacadeService } from './facade/order-detail-facade.service';
import { OrderDetailFormService } from './presentation/order-detail-form.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrderDetailFacadeService, OrderDetailFormService]
})
export class OrderDetailComponent implements OnInit {

  private _order: IOrder;
  form: FormGroup;

  get order(){
    return this._order;
  }

  @Input()
  set order(value: IOrder) {
    if (this._order !== value){
      this._order = value;
    }
  }

  constructor(private formService: OrderDetailFormService) { }

  ngOnInit(): void {
    this.form = this.formService.buildForm();
  }

}
