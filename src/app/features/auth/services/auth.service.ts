import { lastValueFrom, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/http/base.http.service';
import { User } from '../../users/interfaces/user.interface';
import { SignInDto } from '../interfaces/signin.dto.interface';
import { SignUpDto } from '../interfaces/signup.dto.interface';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseHttpService<User> {
  BASE_URL = '/auth';

  async signUp(payload: SignUpDto) {
    return lastValueFrom (this.create(`${this.BASE_URL}/signup`, payload).pipe(
      map((res) => {
        return res
      })
    ));
  }

  signIn(payload: SignInDto): Promise<{access_token: string}>{
    return lastValueFrom (this.create(`${this.BASE_URL}/login`, payload).pipe(
      map((res:any) => {
        return res as {access_token: string}
      })
    ));
  }
}
