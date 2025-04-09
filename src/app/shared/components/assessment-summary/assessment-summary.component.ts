import {Component, Input,inject} from '@angular/core';
import {SharedModule} from "../../index";
import { Router, RouterModule } from '@angular/router';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { Observable , interval,Subscription} from 'rxjs';
import { PaymentService } from '../../../shared/services/payment.service';
import { switchMap ,take, takeWhile } from 'rxjs/operators';
import { BookingService } from '../../../shared/services/booking.service';
import { FeedbackService } from '../../../core';
import { TransactionStatus } from '../../../shared/interfaces/payment';
import { tap, catchError,mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CALENDLYEVENTID } from '../../../core';
import { CreateBookingResponse } from '../../../shared/interfaces/booking';

@Component({
  selector: 'app-assessment-summary',
  standalone: true,
  imports: [SharedModule, RouterModule, CommonModule, ModalComponent],
  templateUrl: './assessment-summary.component.html',
  styleUrl: './assessment-summary.component.scss'
})
export class AssessmentSummaryComponent {
  visible:boolean = false;
  orderTrackingId: string = ''
  createBooking$ = new Observable<TransactionStatus | null>();
  transactionStatusSubscription$ = new Observable<unknown>();
  private _bookingService = inject(BookingService)
  private _sanitizer = inject(DomSanitizer); 
  private _paymentService = inject(PaymentService)
  private _feedbackService = inject(FeedbackService)
  private _router = inject(Router)
  redirectUrl: SafeResourceUrl | null = null;
  booking : boolean = false;
  subscription!: Subscription;
  checkStatus: boolean = false
  message: { title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' } | null = null;

  transactionStatus$ = new Observable<unknown>() ;

  message$ = new Observable<{ title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' } | null>;

  @Input() title!:string;
  @Input() body!:string;
  @Input() linkLabel!:string;
  @Input() component!:string


  checkPaymentStatus() {
    // this.transactionStatus$ = this._paymentService.getTransactionStatus(this.orderTrackingId).pipe(
    //   tap((status: TransactionStatus) => {
    //     if (status.status === '200') {
    //       this.booking = true;
    //       this.checkStatus = false;
    //       this._feedbackService.success('Payment successful!', 'Payment Status');
    //     } else if (status.payment_status_description === 'pending') {
    //       this._feedbackService.warning('Payment pending.', 'Payment Status');
    //     } else {
    //       this._feedbackService.error('Payment failed.', 'Payment Status');
    //     }
    //   }),
    //   catchError((error: any) => {
    //     this._feedbackService.error('Error checking payment status.', 'Payment Status');
    //     return of(null);
    //   }),
    // );
  }
 



  createBooking() {
    this._router.navigate(['/payment-instructions']);
  }

}
