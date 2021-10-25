import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderItemFormService } from '../../../presentation/order-item-form.service';
import {
  IProductGroup,
  IProduct,
} from '../../../../../data-access/order-items.model';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.scss'],
  providers: [OrderItemFormService],
})
export class CreateItemDialogComponent implements OnInit {
  form: FormGroup;

  productGroups$: Observable<IProductGroup[]>;
  products$: Observable<IProduct[]>;

  constructor(
    public dialogRef: MatDialogRef<CreateItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formService: OrderItemFormService
  ) {}

  ngOnInit(): void {
    this.form = this.formService.buildForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  postItem() {
    this.dialogRef.close();
  }

  onProductGroupChanged(productGroup) {}

  onProductChanged(product) {}
}
