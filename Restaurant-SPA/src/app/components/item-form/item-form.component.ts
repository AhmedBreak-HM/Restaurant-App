import { Component, OnInit, Inject } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  private readonly itemService: ItemService;
  isUpdate: string;

  constructor(private _itemService: ItemService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ItemFormComponent>) {
    this.itemService = _itemService;
  }
  ItemForm = this.fb.group({
    ItemId: [0],
    ItemName: ['', Validators.required],
    ItemPrice: [0, Validators.required]
  });

  ngOnInit() {
    this.RecievedData();
  }
  private RecievedData() {
    this.ItemForm.patchValue(this.data);
    this.isUpdate = this.data.ItemId > 0 ? 'Update' : 'Save';
  }
  private onSubmit() {
    if (this.ItemForm.valid) {
      if (this.ItemForm.get('ItemId').value > 0) {
        this.itemService.UpdateEntity(this.ItemForm.get('ItemId').value, this.ItemForm.value)
         .subscribe(() => this.dialogRef.close());
      } else {
        this.itemService.AddEntity(this.ItemForm.value)
          .subscribe(() => this.dialogRef.close());
      }
    }
  }
  ItemName() {
    return this.ItemForm.get('ItemName');
  }
  ItemPrice() {
    return this.ItemForm.get('ItemPrice');
  }

}
