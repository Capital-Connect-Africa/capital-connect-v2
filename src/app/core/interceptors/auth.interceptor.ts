import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../../features/auth/store/auth.store';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const store =inject(AuthStore)
  const authToken = store.getAccessToken();
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return next(clonedRequest);
};
