import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url: string = environment.apiUrl + '/OrderTotal';
  constructor(private http: HttpClient) { }

  private GetOderTotal(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
  /**
   * name
   */
  public GetData(name: any[], value: any[]) {
    this.GetOderTotal().subscribe(data => {
      data.forEach(row => {
        name.push(row.CustomerName);
        value.push(row.Gtotal);
      });

    });
  }
}
