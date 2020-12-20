import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialsModule } from '../materials.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { WidgetAreaComponent } from './widgets/widget-area/widget-area.component';
import { WidgetCardComponent } from './widgets/widget-card/widget-card.component';
import { WidgetPieComponent } from './widgets/widget-pie/widget-pie.component';
import { WidgetTableComponent } from './widgets/widget-table/widget-table.component';




@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    WidgetAreaComponent,
    WidgetCardComponent,
    WidgetPieComponent,
    WidgetTableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialsModule,
    HighchartsChartModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    WidgetAreaComponent,
    WidgetCardComponent,
    WidgetPieComponent,
    WidgetTableComponent
  ]
})
export class SharedModule { }
