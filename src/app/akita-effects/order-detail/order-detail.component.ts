import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { OrderDetailFacadeService } from './facade/order-detail-facade.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [OrderDetailFacadeService]
})
export class OrderDetailComponent implements OnInit {

  private _orderId: number;

  get orderId(){
    return this._orderId;
  }

  @Input()
  set orderId(value: number) {
    if (this._orderId !== value){
      this._orderId = value;
      this.fetchOrderDetails(this._orderId);
    }
  }

  constructor(private facade: OrderDetailFacadeService) { }

  ngOnInit(): void {
  }

  fetchOrderDetails(orderId: number){
    console.log('fetchOrderDetails ', orderId);
    if (orderId) {
      this.facade.fetchOrderDetails$(orderId).pipe(take(1)).subscribe(result => console.log('order details ', result));
    }
  }

}
