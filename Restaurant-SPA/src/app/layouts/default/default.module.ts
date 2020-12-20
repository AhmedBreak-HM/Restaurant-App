import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { AboutComponent } from 'src/app/modules/about/about.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { MaterialsModule } from 'src/app/materials.module';
import { ComponentsModule } from 'src/app/components/Components.module';
import { DashboardService } from 'src/app/services/dashboard.service';




@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    AboutComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    MaterialsModule,
    ComponentsModule,
  ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
