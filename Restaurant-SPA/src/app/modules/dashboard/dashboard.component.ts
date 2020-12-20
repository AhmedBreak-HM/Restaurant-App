import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private readonly dashboardService: DashboardService;

  name = [];
  value = [];
  cards = [];
  pieChart = [];
  tableChart = [];
  constructor(private _dashboardService: DashboardService) {
    this.dashboardService = _dashboardService;

  }

  ngOnInit() {
    this.dashboardService.GetData(this.name , this.value);
    console.log(this.name);
    console.log(this.value);
   /* this.dashboardService.GetOderTotal().subscribe(data => {
      data.forEach(row => {
        this.name.push(row.CustomerName);
        this.value.push(row.Gtotal);
        console.log(this.name);
        console.log(this.value);

      });

    });*/

  }


}
