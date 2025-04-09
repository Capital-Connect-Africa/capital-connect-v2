import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, EMPTY, forkJoin, map, Observable } from 'rxjs';
import { BASE_URL, BaseHttpService, FeedbackService } from '../../../core';
import { AuthStateService } from '../../../features/auth/services/auth-state.service';
import { RequestType, Submission, SubmissionResponse, UserSubmissionResponse } from '../../interfaces/submission.interface';

@Injectable({ providedIn: 'root' })
export class SubmissionService extends BaseHttpService<any>{

  private _authStateService = inject(AuthStateService);
  private _feedBackService = inject(FeedbackService);
  private _currentUserId =  this._authStateService.currentUserId()  && this._authStateService.currentUserId() > 0 ? this._authStateService.currentUserId()  : Number(sessionStorage.getItem('userId'))


  createSingleSubmission(submission: Submission) {
    submission.userId = this._currentUserId
    return this.create(`${BASE_URL}/submissions`, submission).pipe((map(res => {
      this._feedBackService.success('Submitted Successfully')
      return res
    }))) as Observable<SubmissionResponse>;

  }

  createMultipleSubmissions(submissions: Submission[]): Observable<SubmissionResponse[]> {
    const valToSubmit = JSON.stringify({
      submissions: submissions.map(s => {
        return { ...s, userId: this._authStateService.currentUserId()  && this._authStateService.currentUserId() > 0 ? this._authStateService.currentUserId() : Number(sessionStorage.getItem('userId')) };
      })
    });
    return this.create(`${BASE_URL}/submissions/bulk`, JSON.parse(valToSubmit)).pipe((map(res => {
      this._feedBackService.success('Submitted Successfully')
      return res

    }))) as Observable<SubmissionResponse[]>;

  }

  editSubmissions(submissions: Submission[]): Observable<SubmissionResponse[]> {
    const requests =submissions.map(submission =>{
      if(!submission.id){
        return this.create(`${BASE_URL}/submissions`, {userId: this._currentUserId, questionId: submission.questionId, answerId: submission.answerId, text: submission.text})
      }
      return this.update(`${BASE_URL}/submissions`, submission.id, {text: submission.text, answerId: submission.answerId})
    });
    return forkJoin(requests).pipe(map(res =>{
      return res;
    })) as Observable<SubmissionResponse[]>
  }

  fetchSubmissionsByUser(userId: number): Observable<UserSubmissionResponse[]> {
    return this.getById(`${BASE_URL}/submissions/user`, userId).pipe((map(res => {
      return res
    }))) as Observable<UserSubmissionResponse[]>;
  }

  fetchSubmissionsByUserPerSection(userId: number,section:number): Observable<UserSubmissionResponse[]> {
    return this.get(`${BASE_URL}/submissions/user/${userId}/section/${section}`).pipe((map(res => {
      return res

    }))) as Observable<UserSubmissionResponse[]>;
  }

  calculateScoreOfUser(userId: number) {
    // return this.get(`${BASE_URL}/submissions/user/${userId}/score`) as Observable<{ score: number }>
  }

  getSubmissionsScores(userId: number) {
    return this.get(`${BASE_URL}/submissions/user/${userId}/score`)
  }

  deleteUserSubmissions(submissionIds:number[]){
    // const requests =submissionIds.map(id =>this._httpClient.delete(`${BASE_URL}/submissions/${id}`))
    // return forkJoin(requests).pipe(map(res =>{
    //   return res
    // }))
  }

  saveSectionSubmissions(submissions:Submission[][], request =RequestType.SAVE) {
    const requests =request ==RequestType.SAVE
      ? submissions.filter(submission =>submission.length).map(submission =>this.createMultipleSubmissions(submission.map(sub =>({userId: this._currentUserId, questionId: sub.questionId, answerId: sub.answerId, text: sub.text}))))
      : request ==RequestType.EDIT
      ? submissions.filter(submission =>submission.length).map(submission =>this.editSubmissions(submission))
      : [];
    return forkJoin(requests).pipe(map(res =>{
      return res;
    }), 
    catchError(err =>{
      return EMPTY;
    })
  )
  }
}
