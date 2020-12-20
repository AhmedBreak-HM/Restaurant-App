import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IimListComponent } from 'src/app/interfaces/iim-list-component';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsFormComponent } from '../details-form/details-form.component';
import { OrderDetails } from 'src/app/models/order-details.model';

@Component({
  selector: 'app-master-details',
  templateUrl: './master-details.component.html',
  styleUrls: ['./master-details.component.scss']
})
export class MasterDetailsComponent implements OnInit, IimListComponent<OrderDetails> {

  isValid: boolean = true;
  OrderForm: FormGroup;
  customerList: Customer[];
  entitylist: OrderDetails[];
  entity: OrderDetails;
  displayedColumns: string[] = ['ItemId', 'ItemName', 'ItemPrice', 'DetailsQuantity', 'Total', 'customColumn'];
  dataSource: any;
  RowSelect: any;
  index: any;
  isUpdate: string;


  constructor(private fb: FormBuilder, private customerService: CustomerService,
              private orderService: OrderService,
              private dialog: MatDialog, private snackBar: MatSnackBar,
              private router: Router, private currentRoute: ActivatedRoute) {
    this.customerService.BaseUrl = this.customerService.Url;
    this.orderService.BaseUrl = this.orderService.Url;
  }



  ngOnInit() {
    this.LoadData();
    this.LoadCustomer();
  }

  LoadData() {

    const orderId = this.currentRoute.snapshot.paramMap.get('id');
    this.isUpdate = orderId == null ? 'Save' : 'Update';
    this.OrderForm = this.fb.group({
      OrderId: 0,
      OrderNo: Math.floor(100000 + Math.random() * 90000).toString(),
      CustomerId: 0,
      CustomerName: '',
      Pmethod: '',
      Gtotal: 0,
      DeleteDetails: ''
    });
    this.orderService.orderDetails = [];
    if (orderId != null) {

      // tslint:disable-next-line: radix
      this.orderService.GetById(parseInt(orderId)).subscribe(res => {
        this.OrderForm.patchValue(res.order);
        this.orderService.orderDetails = res.details;
        this.Refresh();
      });
    }
  }

  SelectedRow(row: any, index) {
    this.RowSelect = row;
    this.index = index;
  }
  AddOrEdite(index: any) {
    // this.entity = index != null ? this.RowSelect : new OrderDetails(0, null, 0, 0, '', 0, 0);
    if (index == null) {
      this.entity = new OrderDetails(0, null, 0, 0, '', 0, 0);
      this.index = null;
    } else {
      this.entity = this.RowSelect;
    }
    const dialogRef = this.dialog.open(DetailsFormComponent, {
      width: '50%',
      autoFocus: true,
      disableClose: true,
      data: {...this.entity, index: this.index}
    });
    dialogRef.afterClosed().subscribe(() => this.Refresh());
  }
  Delete() {
    this.orderService.orderDetails.splice(this.index, 1);
    this.Refresh();
  }
  calculatGrandTotal = (): number => {
    let sum = 0;
    for (const item of this.orderService.orderDetails) {
      sum += item.Total;
    }
    return sum;
  }

  UpdatGrandTotal() {
    this.OrderForm.patchValue({ Gtotal: this.calculatGrandTotal() });
  }

  Refresh() {
    this.dataSource = new MatTableDataSource(this.orderService.orderDetails);
    this.UpdatGrandTotal();
  }
  private validatForm(): boolean {
    this.isValid = true;
    if (this.CustomerId().value <= 0 || this.Gtotal().value <= 0 ||
        this.Pmethod().value === 'Select' ) {
      this.isValid = false;
      this.CustomerId().setErrors({ incorrect: true });
      this.Gtotal().setErrors({ incorrect: true });
      this.Pmethod().setErrors({ incorrect: true });
    }
    return this.isValid;
  }
  private onSubmit() {
    if (this.validatForm()) {
      const body: any = { ...this.OrderForm.value, orderDetails: this.orderService.orderDetails };
      this.orderService.AddEntity(body).subscribe(res => {
        this.LoadData();
        this.openSnackBar('Submitted Successfully', 'Restaurant App.', 4000);

      });
    }
  }
  private openSnackBar(massage: string, action: string, durations?: number) {
    const snackBarRef = this.snackBar.open(massage, action, { duration: durations });
    snackBarRef.afterDismissed().subscribe(() => this.router.navigate(['/Orders']));
  }
  LoadCustomer() {
    this.customerService.GetEntities().subscribe(res => {
      this.customerList = res;
    });
  }
  GotoOders() {
    this.router.navigate(['/Orders']);
  }

  CustomerId() {
    return this.OrderForm.get('CustomerId');
  }
  Gtotal() {
    return this.OrderForm.get('Gtotal');
  }
  Pmethod() {
    return this.OrderForm.get('Pmethod');
  }

  applyFilter(FilterValue: string) {
    console.log('Method not implemented');
  }

}
