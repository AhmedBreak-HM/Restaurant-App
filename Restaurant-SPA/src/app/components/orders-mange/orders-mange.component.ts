import { Component, OnInit, ViewChild } from '@angular/core';
import { IimListComponent } from 'src/app/interfaces/iim-list-component';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-orders-mange',
  templateUrl: './orders-mange.component.html',
  styleUrls: ['./orders-mange.component.scss']
})
export class OrdersMangeComponent implements OnInit, IimListComponent<Order> {
  private readonly orderService: OrderService;
  entitylist: Order[];
  entity: Order;
  displayedColumns: string[] = ['OrderId', 'OrderNo', 'CustomerId', 'CustomerName', 'Pmethod', 'Gtotal', 'customColumn'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  RowSelect: any;
  index: any;

  constructor(private _orderService: OrderService, private router: Router) {
    this.orderService = _orderService;
    this.orderService.BaseUrl = this.orderService.Url;
  }

  ngOnInit() {
     this.LoadData();
  }

  LoadData() {
    this.orderService.GetEntities().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.entitylist = data;
    });
  }
  applyFilter(FilterValue: string) {
    this.dataSource.filter = FilterValue.trim().toLowerCase();
  }
  SelectedRow(row: any, i: any) {
    this.RowSelect = row;
    this.index = i;
  }
  AddOrEdite(index: any) {
    if (index == null) {
      this.router.navigate(['Order']);
    } else {
      this.router.navigate(['Order/edit/' + this.RowSelect.OrderId]);
    }
  }
  Delete() {
    this.orderService.DeleteEntity(this.RowSelect.OrderId)
        .subscribe(() => this.Refresh());
  }
  Refresh() {
    this.LoadData();
  }
  calculatTotal = (): number => {
    let sum = 0;
    for (const item of this.entitylist) {
      sum += item.Gtotal;
    }
    return sum;
  }




  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.entitylist.map(t => t.Gtotal).reduce((acc, value) => acc + value, 0);
  }

}
