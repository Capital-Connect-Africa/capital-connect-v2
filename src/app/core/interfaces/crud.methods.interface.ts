import { Observable } from 'rxjs';
import { QueryParams } from './query.params.interface';
import { HttpHeaders } from '@angular/common/http';

export interface CrudMethods<T> {
  getAll(
    path: string,
    params?: QueryParams,
    headers?: HttpHeaders
  ): Observable<T[]>;
  getById(path: string, id: number, headers?: HttpHeaders): Observable<T>;
  create(
    path: string,
    payload: Partial<T>,
    headers?: HttpHeaders
  ): Observable<T>;
  update(
    path: string,
    id: number,
    payload: Partial<T>,
    headers?: HttpHeaders
  ): Observable<T>;
  delete(path: string, id: number, headers?: HttpHeaders): Observable<void>;
  // download(path: string, id: number, status: string, headers?:HttpHeaders): Observable<Blob>
}
