import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { merge, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { IOrderItemsSearchResultsUI } from 'src/app/order-entry/order-items/overview/presentation/order-items-search-results/order-items-search-results-ui.model';
import { OrderItemFormService } from '../../../../shared/form/order-item-form.service';
import { CreateItemFacadeService } from '../../../facade/create-item-facade.service';

export interface DialogData {
  orderId: number;
  orderItem?: IOrderItemsSearchResultsUI;
}

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.scss'],
  providers: [OrderItemFormService, CreateItemFacadeService],
})
export class CreateItemDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private unsubscribe$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<CreateItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formService: OrderItemFormService,
    public facade: CreateItemFacadeService
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.form = this.formService.buildForm(this.data.orderId);
    this.form.patchValue({ quantity: 1 });
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  postItem() {
    this.dialogRef.close(this.form.getRawValue());
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
}
