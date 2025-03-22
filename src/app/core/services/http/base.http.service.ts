import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { HttpErrorHandlerService } from './http.error.handler.service';
import { CrudMethods } from '../../interfaces/crud.methods.interface';
import { QueryParams } from '../../interfaces/query.params.interface';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BaseHttpService<T> implements CrudMethods<T> {
  private _httpClient = inject(HttpClient);
  private _errorHandler = inject(HttpErrorHandlerService);
  private BASE_PATH = environment.apiUrl;

  create(
    path: string,
    payload: Partial<T>,
    headers?: HttpHeaders
  ): Observable<T> {
    const options = this.buildOptions({ headers });
    return this._httpClient
      .post<T>(`${this.BASE_PATH}${path}`, payload, options)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  getAll(
    path: string,
    params?: QueryParams,
    headers?: HttpHeaders
  ): Observable<T[]> {
    const options = this.buildOptions({ headers, params });
    return this._httpClient
      .get<T[]>(`${this.BASE_PATH}${path}`, options)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }
  getById(path: string, id: number, headers?: HttpHeaders): Observable<T> {
    const options = this.buildOptions({ headers });
    return this._httpClient
      .get<T>(`${this.BASE_PATH}${path}/${id}`, options)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  update(
    path: string,
    id: number,
    payload: Partial<T>,
    headers?: HttpHeaders
  ): Observable<T> {
    const options = this.buildOptions({ headers });
    return this._httpClient
      .put<T>(`${this.BASE_PATH}${path}/${id}`, payload, options)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  delete(path: string, id: number, headers?: HttpHeaders): Observable<void> {
    const options = this.buildOptions({ headers });
    return this._httpClient
      .delete<void>(`${this.BASE_PATH}${path}/${id}`, options)
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  //   download(path: string, id: number, status: string, headers?: HttpHeaders): Observable<Blob> {

  //   }

  private handleError(error: HttpErrorResponse): Observable<never> {
    return this._errorHandler.handleError(error);
  }

  private buildOptions(options: {
    params?: QueryParams;
    headers?: HttpHeaders;
  }) {
    let httpParams = new HttpParams();
    let httpHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    const { params, headers } = options;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value != null && value != undefined)
          httpParams = httpParams.set(key, value);
      });
    }
    if (headers) {
      Object.entries(headers).forEach(([key, value]) => {
        if (value != null && value != undefined)
          httpHeaders = httpHeaders.set(key, value);
      });
    }
    return { params: httpParams, headers: httpHeaders };
  }
}
