import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';


export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const _loadingService = inject(LoadingService);
  _loadingService.setIsLoading(true);
  return next(req).pipe(
    finalize(() => {
      _loadingService.setIsLoading(false);
    })
  );
};
