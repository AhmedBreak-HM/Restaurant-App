import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-widget-table',
  templateUrl: './widget-table.component.html',
  styleUrls: ['./widget-table.component.scss']
})
export class WidgetTableComponent implements OnInit {
  @Input() data: any = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
