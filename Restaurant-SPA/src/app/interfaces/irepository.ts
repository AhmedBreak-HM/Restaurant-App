import { Observable } from 'rxjs';

export interface IRepository<T> {

    BaseUrl: string;
    GetEntities(): Observable<T[]>;
    AddEntity(Body: T): Observable<T>;
    UpdateEntity(id: number, Body: T): Observable<void>;
    DeleteEntity(id: number): Observable<void>;
    GetById(id: number): Observable<any>;
}
