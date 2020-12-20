import { Component, OnInit, ViewChild } from '@angular/core';
import { IimListComponent } from 'src/app/interfaces/iim-list-component';
import { Item } from 'src/app/models/item.model';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ItemService } from 'src/app/services/item.service';
import { ItemFormComponent } from '../item-form/item-form.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, IimListComponent<Item> {

  private readonly itemService: ItemService;

  entitylist: Item[];
  entity: Item;
  displayedColumns: string[] = ['ItemId', 'ItemName', 'ItemPrice', 'customColumn'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  RowSelect: any;

  constructor(private _itemService: ItemService, private dialog: MatDialog) {
    this.itemService = _itemService;
    this.itemService.BaseUrl = this.itemService.Url;

  }

  ngOnInit() {
    this.LoadData();
  }

  LoadData() {
    this.itemService.GetEntities().subscribe(data => {
      this.dataSource = new MatTableDataSource<Item>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.entitylist = data;
    });
  }
  applyFilter(FilterValue: string) {
    this.dataSource.filter = FilterValue.trim().toLowerCase();
  }
  SelectedRow(row: any) {
    this.RowSelect = row;
  }
  AddOrEdite(index: any) {
    this.entity = index != null ? this.RowSelect : new Item(0, '', 0);
    const dialogRef = this.dialog.open(ItemFormComponent, {
      width: '50%',
      autoFocus: true,
      disableClose: true,
      data: this.entity
    });
    dialogRef.afterClosed().subscribe(() => this.LoadData());
  }
  Delete() {
    this.itemService.DeleteEntity(this.RowSelect.ItemId).subscribe(
      () => this.LoadData());
  }
  Refresh() {
    this.LoadData();
  }

}
