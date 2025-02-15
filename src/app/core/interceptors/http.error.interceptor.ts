import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY, of, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      toastService.show({
        severity: 'error',
        summary: `${error.statusText}`.toUpperCase(),
        details: error.error.message
          ? error.error.message
          : error.error.messages
          ? error.error.messages.at(0)
          : error.message,
      });
      if (error.error.statusCode === 400) {
        return EMPTY;
      }
      if (error.error.statusCode === 401) {
        return EMPTY;
      }
      if (error.error.statusCode === 403) {
        return EMPTY;
      }
      if (isValidCompanyOwnerPath(error.url as string)) {
        if (error.error.statusCode === 404) {
        }
        return EMPTY;
      }

      if (isGettingActiveSubscription(error.url as string)) {
        if (error.error.statusCode === 404) {
          return throwError(() => error.error.message || error.error);
        }
        return EMPTY;
      }

      if (isValidInvestorProfilePath(error.url as string)) {
        if (
          router.url !== '/investor/investor-details' &&
          router.url !== '/investor/onboarding'
        ) {
          router.navigateByUrl('/investor/onboarding');
        }
        return EMPTY;
      }

      if (isValidAuthLoginPath(error.url as string)) {
        if (error.error.message.includes('Your email is not verified')) {
          router.navigateByUrl('/verify-email');
        }
      }

      if (isFinancialReportsPage(error.url as string)) {
        return EMPTY;
      }

      let errorMessage = 'An unknown error occurred!';

      if (error?.error?.message) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(() => errorMessage);
    })
  );
};

function isValidCompanyOwnerPath(path: string): boolean {
  const regex = /^.+\/company\/owner\/\d+$/;
  return regex.test(path);
}

function isValidInvestorProfilePath(path: string): boolean {
  const regex = /^.+\/investor-profiles\/by-user\/\d+$/;
  return regex.test(path);
}

function isGettingActiveSubscription(path: string): boolean {
  const regex = /^.+\/subscriptions\/user\/\d+$/;
  return regex.test(path);
}

function isValidAuthLoginPath(path: string): boolean {
  return path.includes('login');
}

function isFinancialReportsPage(path: string): boolean {
  return (
    path.includes('opex') ||
    path.includes('revenues') ||
    path.includes('cost-of-sales') ||
    path.includes('finances') ||
    path.includes('balance-sheet')
  );
}

// {
//   "message": "Invalid username or password",
//   "error": "Bad Request",
//   "statusCode": 400
// }
//TOD: @pchessah handle server error differently: Allow user to contact admin
