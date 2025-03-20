import { map } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/http/base.http.service';
import { User } from '../../users/interfaces/user.interface';
import { SignInDto } from '../interfaces/signin.dto.interface';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseHttpService<User> {
  BASE_URL = '/auth';

  signup(payload: SignInDto) {
    return this.create(`${this.BASE_URL}/signup`, payload).pipe(
      map((res) => {
        debugger;
      })
    );
  }

  signin(){

  }
  signout(){

  }
}
