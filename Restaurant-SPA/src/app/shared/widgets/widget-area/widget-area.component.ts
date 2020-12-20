import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog } from '@angular/material';
import { SpinnerWaiteComponent } from 'src/app/components/spinner-waite/spinner-waite.component';



@Component({
  selector: 'app-widget-area',
  templateUrl: './widget-area.component.html',
  styleUrls: ['./widget-area.component.scss']
})
export class WidgetAreaComponent implements OnInit {

  @Input() Name = [];
  @Input() Value = [];
  Bar;
  isLoad = true;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.load();
    this.loading();
  }

  load() {

    this.isLoad = false;
    this.Bar = new Chart('Bar', {
      type: 'bar',
      data: {
        labels: this.Name,
        datasets: [{
          label: '# of Sales',
          data: this.Value,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  private loading() {
    const dialogRef = this.dialog.open(SpinnerWaiteComponent, {
      width: '50%',
      autoFocus: true,
      disableClose: true,
      backdropClass: 'back'

    });
    dialogRef.afterOpened().subscribe(() => {
      if (this.Name.length > 0) {
        (this.Bar as Chart).update();
        dialogRef.close();
      }
    });
  }
}
