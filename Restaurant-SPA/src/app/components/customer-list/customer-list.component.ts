import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { IimListComponent } from 'src/app/interfaces/iim-list-component';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit , IimListComponent<Customer> {

  private readonly customerService: CustomerService;

  entitylist: Customer[];
  entity: Customer;
  displayedColumns: string[] = ['CustomerId', 'CustomerName', 'customColumn'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  RowSelect: any;


  constructor( private _customerService: CustomerService, private dialog: MatDialog) {
    this.customerService = _customerService;
    this.customerService.BaseUrl = this.customerService.Url;
   }

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.customerService.GetEntities().subscribe(data => {
      this.dataSource = new MatTableDataSource<Customer>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.entitylist = data;
    });
  }
  applyFilter(FilterValue: string) {
    this.dataSource.filter = FilterValue.trim().toLowerCase();
  }
  SelectedRow(row) {
    this.RowSelect = row;
  }
  AddOrEdite(index) {
    this.entity = index != null ? this.RowSelect : new Customer(0, '');
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '50%',
      autoFocus: true,
      disableClose: true,
      data: this.entity
    });
    dialogRef.afterClosed().subscribe(() => this.LoadData());
  }
  Delete() {
    this.customerService.DeleteEntity(this.RowSelect.CustomerId).subscribe(
      () => this.LoadData());
   }

   Refresh() {
     this.LoadData();
   }



}
