import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IRepository } from '../interfaces/irepository';


@Injectable({
  providedIn: 'root'
})
export class RepositoryService<T> implements IRepository<T> {

  public BaseUrl: string;
  private readonly http: HttpClient;

  constructor(private _http: HttpClient) {
    this.http = _http;
  }
  /**
   * Get Entity
   */
  public GetEntities(): Observable<T[]> {
    return this.http.get<T[]>(this.BaseUrl).pipe(retry(1), catchError(this.handleError));
  }
  /**
   * Post Entity
   */
  public AddEntity(Body: T): Observable<T> {
    return this.http.post<T>(this.BaseUrl, Body).pipe(retry(1), catchError(this.handleError));
  }
  /**
   * Put Entity
   */
  public UpdateEntity(id: number, Body: T): Observable<void> {
    return this.http.put<void>(`${this.BaseUrl}/${id}`, Body).pipe(retry(1), catchError(this.handleError));
  }
  /**
   * Delete Entity
   */
  public DeleteEntity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BaseUrl}/${id}`).pipe(retry(1), catchError(this.handleError));
  }
  /**
   * GetById
   */
  public GetById(id: number): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl}/${id}`).pipe(retry(1), catchError(this.handleError));
  }
  /**
   * Handle Error
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error:client-side ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Server-side Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
