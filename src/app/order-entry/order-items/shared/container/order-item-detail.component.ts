import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { IOrderItemsSearchResultsUI } from '../../overview/presentation/order-items-search-results/order-items-search-results-ui.model';
import { OrderItemFacadeService } from '../facade/order-item-facade.service';
import { OrderItemFormService } from '../form/order-item-form.service';

@Component({
  selector: 'app-order-item-detail',
  templateUrl: './order-item-detail.component.html',
  styleUrls: ['./order-item-detail.component.scss'],
  providers: [OrderItemFormService, OrderItemFacadeService],
})
export class OrderItemDetailComponent implements OnInit, OnDestroy {
  @Input() orderId: number;
  @Input() orderItem: IOrderItemsSearchResultsUI;
  form: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private formService: OrderItemFormService,
    public facade: OrderItemFacadeService
  ) {}

  ngOnInit(): void {
    this.form = this.formService.buildForm(this.orderId, this.orderItem);
    if (this.form.get('productGroup').value) {
      this.facade.fetchProductsForGroup$(this.form.get('productGroup').value);
    }
    merge(
      this.amountControl().valueChanges,
      this.quantityControl().valueChanges
    )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((val) => {
        const quantity = this.form.get('quantity').value;
        const amount = this.form.get('amount').value;
        this.form.patchValue({
          vatAmount: amount * quantity * 0.25,
          totalAmount: amount * quantity * 0.25 + amount * quantity,
        });
      });
  }

  onProductGroupChanged(code) {
    this.facade
      .getProductGroupName$(code)
      .pipe(take(1))
      .subscribe((name) => {
        this.form.patchValue({ productGroupName: name });
        this.facade.fetchProductsForGroup$(code);
      });
  }

  onProductChanged(code) {
    this.facade
      .getProductName$(code)
      .pipe(take(1))
      .subscribe((name) => {
        this.form.patchValue({ productName: name });
      });
  }

  amountControl(): FormControl {
    return this.form.get('amount') as FormControl;
  }

  quantityControl(): FormControl {
    return this.form.get('quantity') as FormControl;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
