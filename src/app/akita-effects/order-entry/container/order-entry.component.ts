import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderEntryFacadeService } from '../facade/order-entry-facade.service';

@Component({
  selector: 'app-order-entry',
  templateUrl: './order-entry.component.html',
  styleUrls: ['./order-entry.component.scss']
})
export class OrderEntryComponent implements OnInit {

  public orderId : number = null;
  private unsubscribe$ = new Subject();
  private lastEmittedOrderId: number = null;

  constructor(
    private facade: OrderEntryFacadeService,
    private route: ActivatedRoute){}

  ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe(p => {
       if (p.orderId) {
        this.onOrderNumberUpdated(p.orderId)
      }});

  }

  onOrderNumberUpdated(orderId: string){
    let orderIdNumber: number;
    orderIdNumber = Number(orderId);
    if (!Number.isNaN(orderIdNumber) && this.lastEmittedOrderId !== orderIdNumber) {
       this.orderId = orderIdNumber;
      this.lastEmittedOrderId = orderIdNumber;
    }
  }



}
