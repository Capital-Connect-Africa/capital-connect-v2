import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../../features/auth/store/auth.store';
import { throwError } from 'rxjs';
import { LogoutUtil } from '../utils/logout.util';



export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const path = new URL(req.url).pathname;
  if(publicEndPoints.includes(path)) return next(req);
  const store =inject(AuthStore);
  const logoutUtil =inject(LogoutUtil)
  
  const accessToken =store.getAccessToken()
  if(!accessToken) {
    logoutUtil.logOut()
    return throwError(() =>new Error('Login required*'))
  }
  const { exp } =store.decodeAccessToken(accessToken) ?? {};
  if (exp && Date.now() >= exp * 1000) { 
    logoutUtil.logOut();
    return throwError(() => new Error('Your session expired'));
  }

  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return next(clonedRequest);
};

const publicEndPoints =[
  '/auth/login',
  '/auth/signup',
  '/auth/resend-verification-email',
  '/users/verify-email',
];