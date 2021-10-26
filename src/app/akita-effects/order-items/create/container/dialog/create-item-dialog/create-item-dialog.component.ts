import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { merge, Observable, Subject } from 'rxjs';
import { OrderItemFormService } from '../../../presentation/order-item-form.service';
import {
  IProductGroup,
  IProduct,
} from '../../../../../data-access/order-items.model';
import { filter, map, takeUntil } from 'rxjs/operators';

export interface DialogData {
  productGroups$: Observable<IProductGroup[]>;
  products$: Observable<IProduct[]>;
}

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.scss'],
  providers: [OrderItemFormService],
})
export class CreateItemDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  filteredProducts$: Observable<IProduct[]>;
  private unsubscribe$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<CreateItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formService: OrderItemFormService
  ) {}
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.form = this.formService.buildForm();
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
    console.log(this.form.value);
    this.dialogRef.close(this.form.value);
  }

  onProductGroupChanged(productGroup) {
    this.filteredProducts$ = this.data.products$.pipe(
      map((products) =>
        products.filter((product) => product.productGroupCode === productGroup)
      )
    );
  }

  amountControl(): FormControl {
    return this.form.get('amount') as FormControl;
  }

  quantityControl(): FormControl {
    return this.form.get('quantity') as FormControl;
  }
}
