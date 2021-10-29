import { FormControl } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
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

  control: FormControl = new FormControl(null);

  ngOnInit(): void {}

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
