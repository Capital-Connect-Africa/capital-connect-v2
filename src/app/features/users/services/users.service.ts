import { lastValueFrom, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../../core/services/http/base.http.service';
import { User } from '../interfaces/user.interface';
import { QueryParams } from '../../../core/interfaces/query.params.interface';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseHttpService<User> {
  BASE_URL = '/users';

  verifyEmailToken(token:string): Promise<{access_token: string}>{
    const params:QueryParams ={token}
    return lastValueFrom (this.getAll(`${this.BASE_URL}/verify-email`, params).pipe(
      map((res:any) => {
        return res as {access_token: string}
      })
    ));
  }

  
}
