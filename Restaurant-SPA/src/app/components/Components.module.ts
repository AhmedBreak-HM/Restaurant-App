import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialsModule } from '../materials.module';
import { RepositoryService } from '../Repository/repository.service';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { DetailsFormComponent } from './details-form/details-form.component';
import { ItemFormComponent } from './item-form/item-form.component';
import { ItemListComponent } from './item-list/item-list.component';
import { MasterDetailsComponent } from './master-details/master-details.component';
import { OrdersMangeComponent } from './orders-mange/orders-mange.component';
import { SpinnerWaiteComponent } from './spinner-waite/spinner-waite.component';



@NgModule({
  declarations: [
    CustomerFormComponent,
    CustomerListComponent,
    DetailsFormComponent,
    ItemFormComponent,
    ItemListComponent,
    MasterDetailsComponent,
    OrdersMangeComponent,
    SpinnerWaiteComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialsModule
  ],
  providers: [
    RepositoryService
  ],
  entryComponents: [
    CustomerFormComponent,
    ItemFormComponent,
    DetailsFormComponent,
    SpinnerWaiteComponent
  ]
})
export class ComponentsModule { }
