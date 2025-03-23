import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpInterceptorFn } from '@angular/common/http';
import { HttpMethod } from '../interfaces/http.error.interface';
import { ErrorHandlerUtil } from '../utils/handle.error.util';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorHandler =new ErrorHandlerUtil()
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      errorHandler.handleError(error, req.method.toUpperCase() as HttpMethod)
      return EMPTY;
    }));
};