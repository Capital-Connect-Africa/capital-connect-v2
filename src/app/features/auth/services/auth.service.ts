import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { BaseHttpService } from '../../../core/services/http/base.http.service';
import { SignupDetails } from '../../../core/interfaces/signup.details.interface';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseHttpService<User> {
  BASE_URL = '/auth';

  signup(payload: SignupDetails) {
    return this.create(`${this.BASE_URL}/signup`, payload).pipe(
      map((res) => {
        debugger;
      })
    );
  }
}
