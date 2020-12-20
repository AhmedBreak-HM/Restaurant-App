import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './modules/home/home.component';
import { AboutComponent } from './modules/about/about.component';
import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { MasterDetailsComponent } from './components/master-details/master-details.component';
import { OrdersMangeComponent } from './components/orders-mange/orders-mange.component';


const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [
    { path: '', component: HomeComponent },
    { path: 'About', component: AboutComponent },
    { path: 'Dashboard' , component: DashboardComponent},
    {path : 'Customer', component: CustomerListComponent},
    {path : 'Item', component: ItemListComponent},
    {path : 'Orders', component: OrdersMangeComponent},
    {path : 'Order', children: [
      {path : '', component: MasterDetailsComponent},
      {path : 'edit/:id', component: MasterDetailsComponent}
    ]},
  ]
}, {
  path: '',
  component: FullwidthComponent,
  children: [
    { path: 'Login', component: LoginComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
