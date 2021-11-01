import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { IOrderItemsSearchResultsUI } from 'src/app/order-entry/order-items/overview/presentation/order-items-search-results/order-items-search-results-ui.model';
import { OrderItemDetailComponent } from 'src/app/order-entry/order-items/shared/container/order-item-detail.component';

export interface DialogData {
  orderId: number;
  orderItem?: IOrderItemsSearchResultsUI;
}

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.scss'],
})
export class CreateItemDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  orderId: number;

  @ViewChild('detail') detail: OrderItemDetailComponent;

  private unsubscribe$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<CreateItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.orderId = this.data.orderId;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  postItem() {
    this.dialogRef.close(this.detail.form.getRawValue());
  }
}
