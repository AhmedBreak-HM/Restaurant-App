import { Component, OnInit, Inject } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Item } from 'src/app/models/item.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-details-form',
  templateUrl: './details-form.component.html',
  styleUrls: ['./details-form.component.scss']
})
export class DetailsFormComponent implements OnInit {

  isUpdate: string;
  itemList: Item[];
  index;
  isValid: boolean = true;


  constructor(private itemService: ItemService,
              private orderService: OrderService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DetailsFormComponent>) {
    this.itemService.BaseUrl = this.itemService.Url;
  }

  DetailsForm = this.fb.group({
    DetailsId: 0,
    OrderId: this.data.OrderId,
    ItemId: 0,
    DetailsQuantity: 0,
    ItemName: '',
    ItemPrice: 0,
    Total: 0,

  });
  ngOnInit() {
    this.RecievedData();
    this.loadItem();
  }

  private RecievedData() {
    this.DetailsForm.patchValue(this.data);
    this.isUpdate = this.data.index != null ? 'Update' : 'Save';
  }
  loadItem() {
    this.itemService.GetEntities().subscribe(res => {
      this.itemList = res;
    });
  }

  private updatePrice(id) {
    if (id <= 0) {
      this.DetailsForm.patchValue({ ItemPrice: 0 });
    } else {
      this.index = this.itemList.findIndex(item => item.ItemId === id);

      this.DetailsForm.patchValue({
        ItemPrice: this.itemList[this.index].ItemPrice,
        ItemName: this.itemList[this.index].ItemName
      });
      this.updatTotal();
    }
  }

  private updatTotal() {
    this.DetailsForm.patchValue({
      Total: parseFloat((this.DetailsQuantity().value * this.ItemPrice().value).toFixed(2))
    });
  }

  private validatForm(): boolean {
    this.isValid = true;
    if (this.ItemId().value <= 0 || this.DetailsQuantity().value <= 0 ||
      this.Total().value <= 0) {
      this.isValid = false;
      this.ItemId().setErrors({ incorrect: true });
      this.DetailsQuantity().setErrors({ incorrect: true });
      this.Total().setErrors({ incorrect: true });
    }
    return this.isValid;
  }

  private onSubmit() {

    if (this.validatForm()) {
      if (this.data.index == null) {
        // add to arry
        this.orderService.orderDetails.push(this.DetailsForm.value);
      } else {
        // update arry
        this.orderService.orderDetails[this.data.index] = this.DetailsForm.value;
      }
      this.dialogRef.close();
    }
  }

  ItemId() {
    return this.DetailsForm.get('ItemId');
  }

  DetailsQuantity() {
    return this.DetailsForm.get('DetailsQuantity');
  }
  ItemPrice() {
    return this.DetailsForm.get('ItemPrice');
  }
  Total() {
    return this.DetailsForm.get('Total');
  }

}
