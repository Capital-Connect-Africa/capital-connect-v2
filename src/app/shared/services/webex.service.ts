import { Injectable ,inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { BaseHttpService } from '../../core/http/base/base.http.service';
import { MeetingResponse, SaveMeetingPayload } from '../interfaces/booking';
import { BASE_URL } from '../../core';
import { Router } from '@angular/router';
import { AuthStateService } from '../../features/auth/services/auth-state.service';
import { BaseHttpService } from '../../core';

@Injectable({
  providedIn: 'root'
})
export class WebExService extends BaseHttpService<any> {
  authStateService = inject(AuthStateService);
  token = this.authStateService.authToken;
  // constructor(private _httpClient: HttpClient, private router: Router) {
  //   super(_httpClient);
  // }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': `Bearer ${this.token}`
  });


  createMeeting(request: any): Observable<unknown> {
    return this.create(`${BASE_URL}/webex/create`, request) as Observable<unknown>;
  }

  getMeeting(id: string): Observable<MeetingResponse> {
    return this.get(`${BASE_URL}/webex/${id}`) as unknown as Observable<MeetingResponse>;
  }

  saveMeetingNotes(request:SaveMeetingPayload,bookingId:number):Observable<unknown>{
    return this.update(`${BASE_URL}/bookings`,bookingId, request) as Observable<unknown>;
  }

}