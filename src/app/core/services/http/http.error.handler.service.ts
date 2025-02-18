import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HttpErrorHandlerService {
  handleError(error: HttpErrorResponse): Observable<never> {
    const message =
      (error.error && error.error instanceof ErrorEvent
        ? error.error.message
        : error.message) ?? 'An unknown error occured';
    return throwError(() => new Error(message));
  }
}
