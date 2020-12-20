import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order.model';
import { List } from 'linqts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    Bar;
    Name: Array<any> = Array();
    Value: Array<any> = Array();
    url: string = environment.apiUrl + '/OrderTotal';



    isLoad = true;

    constructor(private orderService: OrderService, private http: HttpClient) {
        this.orderService.BaseUrl = this.orderService.Url;
        this.load();
    }

    ngOnInit() {
        this.load();
    }

    load() {
       /* this.orderService.GetEntities().subscribe(data => {

            const Name = [];
            const Value = [];
            let arr = new List<Order>(data).OrderBy(x => x.CustomerName).ToArray();
            console.log(arr);
            for (const item of arr) {
                const name = item.CustomerName;
                const tot = item.Gtotal;
                if (item.CustomerName === name) {
                    Name.push(item.CustomerName);
                    Value.push(item.Gtotal);
                } else {
                    Value.push(item.Gtotal + tot);
                }

            }
            this.Name = Name;
            this.Value = Value;
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
            console.log(this.Name);
            console.log(this.Value);

        });*/
        this.GetEntities().subscribe(data => {
            const Name: string[] = [];
            const Value: number[] = [];
            data.forEach( row => {
                Name.push(row.CustomerName);
                Value.push(row.Gtotal);
            });
            this.Name = Name;
            this.Value = Value;
            this.isLoad = false;
            console.log(this.Name);
            console.log(this.Value);
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
        });

    }
    private GetEntities(): Observable<any[]> {
        return this.http.get<any[]>(this.url);
    }

}


