
export interface IimListComponent<T> {

    entitylist: T[];
    entity: T;
    displayedColumns: string[];
    dataSource;
    RowSelect;

    LoadData();
    applyFilter(FilterValue: string);
    SelectedRow(row , index?);
    AddOrEdite(index);
    Delete();
    Refresh();
}
