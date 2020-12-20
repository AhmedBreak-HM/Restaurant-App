import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule,
  MatDialogModule, MatSortModule, MatPaginatorModule, MatSnackBarModule,
  MatSidenavModule,
  MatDividerModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
const Material = [
  MatButtonModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatDialogModule,
  MatSortModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatDividerModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule

];

@NgModule({
  imports: [Material],
  exports: [Material]

})
export class MaterialsModule { }
