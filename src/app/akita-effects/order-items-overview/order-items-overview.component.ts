import { Component, Input, OnInit } from '@angular/core';
import { IOrderItem } from '../data-access/order-items.model';

@Component({
  selector: 'app-order-items-overview',
  templateUrl: './order-items-overview.component.html',
  styleUrls: ['./order-items-overview.component.scss']
})
export class OrderItemsOverviewComponent implements OnInit {

  @Input() orderItems: IOrderItem[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
