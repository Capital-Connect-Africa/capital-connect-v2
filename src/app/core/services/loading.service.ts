import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoadingService {
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  isLoading = this._isLoading$.asObservable();

  setIsLoading(value: boolean) {
    this._isLoading$.next(value);
  }
}
