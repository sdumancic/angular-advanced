import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { OrderDetailFacadeService } from '../order-detail/facade/order-detail-facade.service';
import { OrderDetailsQuery } from '../order-detail/state/order-details.query';
import { OrderItemsOverviewFacadeService } from '../order-items/overview/facade/order-items-overview-facade.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnDestroy {
  private _orderId: number;
  private unsubscribe$ = new Subject();

  @Input()
  set orderId(value: number) {
    this._orderId = value;
    if (this.control) {
      this.control.patchValue(value, { emitEvent: false });
    }
  }
  @Output() orderNumberUpdated = new EventEmitter<string>();
  @Output() revert = new EventEmitter<void>();

  control: FormControl = new FormControl(null);

  constructor(
    public orderDetailFacadeService: OrderDetailFacadeService,
    public orderItemsFacade: OrderItemsOverviewFacadeService
  ) {}

  onRevert() {
    this.revert.emit();
  }

  clearSearch() {
    this.control.setValue(null);
  }

  emitOrderUpdate() {
    this.orderNumberUpdated.emit(this.control.value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
