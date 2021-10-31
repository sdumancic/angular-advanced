import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../create/container/dialog/create-item-dialog/create-item-dialog.component';
import { IOrderItemsSearchResultsUI } from '../../overview/presentation/order-items-search-results/order-items-search-results-ui.model';
import { OrderItemDetailComponent } from '../../shared/container/order-item-detail.component';

@Component({
  selector: 'app-edit-item-dialog',
  templateUrl: './edit-item-dialog.component.html',
  styleUrls: ['./edit-item-dialog.component.scss'],
})
export class EditItemDialogComponent implements OnInit, AfterViewInit {
  orderId: number;
  orderItem: IOrderItemsSearchResultsUI;

  @ViewChild('detail') detail: OrderItemDetailComponent;

  constructor(
    public dialogRef: MatDialogRef<EditItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.orderId = this.data.orderId;
    this.orderItem = this.data.orderItem;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  postItem() {
    this.dialogRef.close(this.detail.form.getRawValue());
  }
}
