import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  private readonly customerService: CustomerService;
  isUpdate: string;

  constructor(private _customerSevice: CustomerService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<CustomerFormComponent>) {
    this.customerService = _customerSevice;
    this.RecievedData();
  }

  FrmCustomer = this.fb.group({
    CustomerId: [0],
    CustomerName: ['', Validators.required]
  });

  ngOnInit() {
  }
  private RecievedData() {
    this.FrmCustomer.patchValue(this.data);
    this.isUpdate = this.data.CustomerName == '' ? 'Save' : 'Update';
  }
  private onSubmit() {
    if (this.FrmCustomer.valid) {
      if (this.FrmCustomer.get('CustomerId').value > 0) {
        this.customerService.UpdateEntity(this.FrmCustomer.get('CustomerId').value, this.FrmCustomer.value)
          .subscribe(() => this.dialogRef.close());
      } else {
        this.customerService.AddEntity(this.FrmCustomer.value)
          .subscribe(() => this.dialogRef.close());
      }

    }

  }

}
