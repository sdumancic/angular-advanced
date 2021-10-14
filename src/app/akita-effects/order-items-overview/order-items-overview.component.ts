import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-items-overview',
  templateUrl: './order-items-overview.component.html',
  styleUrls: ['./order-items-overview.component.scss']
})
export class OrderItemsOverviewComponent implements OnInit {

  @Input() orderId: number = null;
  constructor() { }

  ngOnInit(): void {
  }

}
