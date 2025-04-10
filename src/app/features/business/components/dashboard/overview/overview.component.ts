import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { OverviewSectionComponent } from "../../../../../shared/components/overview-section/overview-section.component";
import { CardComponent } from "../../../../../shared/components/card/card.component";
import { tap, switchMap, Observable } from "rxjs";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { CompanyStateService } from "../../../../organization/services/company-state.service";
import { BusinessOnboardingScoringService } from "../../../../../shared/services/business.onboarding.scoring.service";
import { MatchedInvestor } from "../../../../../shared/interfaces";
import { PdfGeneratorService } from '../../../../../shared/services/pdf-generator.service';
import { SharedModule, SubMissionStateService } from '../../../../../shared';
import { UserSubmissionResponse } from '../../../../../shared';
import { GeneralSummary } from '../../../../../shared';
import { RemoveQuotesPipe } from '../../../../../shared/pipes/remove-quotes.pipe';
import { Router, RouterModule } from '@angular/router';
import { RoutingService } from '../../../../../shared/business/services/routing.service';
import { TableModule } from 'primeng/table';
import { NumberAbbriviationPipe } from '../../../../../core/pipes/number-abbreviation.pipe';
import { SignalsService } from '../../../../../core/services/signals/signals.service';
import { groupUserSubmissions } from '../../../../../core/utils/group-user-submissions';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BusinessAndInvestorMatchingService } from '../../../../../shared/business/services/busines.and.investor.matching.service';
import { map } from 'rxjs';
import { DeclineReasons } from '../../../../../shared/interfaces';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    OverviewSectionComponent,
    CardComponent,
    CommonModule,
    ModalComponent,
    RemoveQuotesPipe,
    RouterModule,
    SharedModule,
    TableModule,
    NumberAbbriviationPipe,
    MultiSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  @ViewChild('content', { static: false }) content!: ElementRef;
  @ViewChild('business_content', { static: false }) business_content!: ElementRef;
  @ViewChild('impact_content', { static: false }) impact_content!: ElementRef;
  private _routingService =inject(RoutingService);
  next_route:{url: string, title?: string} ={url: '', title: ''}
  nextRoute$ =this._routingService.nextRoute().pipe(tap(res =>{
    this.next_route =res.length? res[0]: {url: '', title: ''}
  }));

  visible = false;
  factSheetVisible = false;
  impactElementVisible = false;
  investorsDiagVisible = false;
  matchedInvestors: MatchedInvestor[] = [];
  declinedConnections: MatchedInvestor[] = [];
  connectionRequests: MatchedInvestor[] = [];
  connectedInvestors: MatchedInvestor[] = [];
  investorEligibilityScore: string = '0';
  investorPreparednessScore: string = '0';
  answers: UserSubmissionResponse[] = [];
  generalSummary!: GeneralSummary;
  declineReasons: DeclineReasons[] = [];
  select_reasons:boolean = false

  private _businessMatchingService = inject(BusinessAndInvestorMatchingService)

  preparednessAnswers: UserSubmissionResponse[] = [];
  factSheetAnswers: UserSubmissionResponse[] = [];
  impactElementAnswers : UserSubmissionResponse[] = [];

  eligibilityAnswers: UserSubmissionResponse[] = [];

  stats = { matched: 0, connected: 0, interesting: 0, declined: 0, requested: 0}
  InvestorPreparednessgeneralSummary: GeneralSummary | undefined;
  InvestorEligibilitygeneralSummary: GeneralSummary | undefined;


  currentModal: 'eligibility' | 'preparedness' = 'eligibility';

  private _router =inject(Router);
  signalService =inject(SignalsService);
  private _pdfService = inject(PdfGeneratorService);
  private _companyService = inject(CompanyStateService);
  private _submissionStateService = inject(SubMissionStateService);
  private _scoringService = inject(BusinessOnboardingScoringService);
  declineForm!: FormGroup
  decline: boolean = false;

  response$ =new Observable<any>()

  currentCompany = this._companyService.currentCompany;

  stats$ =this._scoringService.getCompanyStats().pipe(tap(res =>{
    this.stats =res;
  }))
  decline_uuid!: string;

  constructor(private fb: FormBuilder) {
    this.declineForm = this.fb.group({
      countriesOfInvestmentFocus: [[]],
      reasons:[[]]
    });
  }


  declineReasons$ = this._businessMatchingService.getDeclineReasons().pipe(
    map(reasons => reasons.filter(reason => reason.declineRole === "business")),
    tap(filteredReasons => {
      this.declineReasons = filteredReasons;
    })
  );

investorBusinessRelations$ =this._scoringService.getBusinessInvestorRelations().pipe(tap(res =>{
  this.matchedInvestors =res.matches;
  this.connectionRequests =res.requests;
  this.declinedConnections =res.declines;
  this.connectedInvestors =res.connections;
}))


  reload(){
    this.investorBusinessRelations$ =this._scoringService.getBusinessInvestorRelations().pipe(tap(res =>{
      this.matchedInvestors =res.matches;
      this.connectionRequests =res.requests;
      this.declinedConnections =res.declines;
      this.connectedInvestors =res.connections;
    }))
  }

  scoring$ = this._scoringService.getOnboardingScores().pipe(tap(scores => {
    this.investorEligibilityScore = scores.investorEligibility;
    this.investorPreparednessScore = scores.investorPreparedness;
  }))

  submissions$ = this._submissionStateService.getUserSubmissionsPerSection().pipe(tap(submissions => {
    this.eligibilityAnswers = groupUserSubmissions(submissions)
  }))

  preparednessSubmissions$ = this._submissionStateService.getUserPreparednessSubmissionsPerSection().pipe(tap(submissions => {
    this.preparednessAnswers = groupUserSubmissions(submissions)
  }))


  esgSubmissions$ = this._submissionStateService.getEsgSubmissionsPerSection().pipe(tap(submissions => {
    this.impactElementAnswers = groupUserSubmissions(submissions)
  }))

  factSheetSubmissions$ = this._submissionStateService.getFactSheetSubmissionsPerSection().pipe(tap(submissions => {
    this.factSheetAnswers = groupUserSubmissions(submissions)
  }))


  preparednessScore = parseFloat(this.investorPreparednessScore);

  investorPreparednessGeneralSummary$ = this.scoring$.pipe(
    tap(scores => {
      this.preparednessScore = parseFloat(scores.investorPreparedness);
    }),
    switchMap(() => this._scoringService.getGeneralSummary(this.preparednessScore, "PREPAREDNESS")),
    tap(generalSummary => {
      this.InvestorPreparednessgeneralSummary = generalSummary;
    })
  );

  eligibilityScore = parseFloat(this.investorEligibilityScore);

  investorEligibilityGeneralSummary$ = this.scoring$.pipe(
    tap(scores => {
      this.eligibilityScore = parseFloat(scores.investorEligibility);
    }),
    switchMap(() => this._scoringService.getGeneralSummary(this.eligibilityScore, "ELIGIBILITY")),
    tap(generalSummary => {
      this.InvestorEligibilitygeneralSummary = generalSummary;
    })
  );


  showDialog(reportType: string) {
    if (reportType === this.investorEligibilityScore) {
      this.currentModal = "eligibility"
    } else if (reportType === this.investorPreparednessScore) {
      this.currentModal = "preparedness"
    }
    this.visible = !this.visible;
  }

  setDialog(dialog: string) {
    if (dialog === "factSheet") {
      this.factSheetVisible = !this.factSheetVisible;
    }else if(dialog = "impactAssesment"){
      this.impactElementVisible = !this.impactElementVisible
    }
  }

  showMatchedInvestors() {
    this.signalService.matchedInvestorsDialogIsVisible.set(true)
  }

  showConnectionRequests() {
    this.signalService.connectionRequestsDialogIsVisible.set(true)
  }

  showConnectedInvestors() {
    this.signalService.connectedInvestorsDialogIsVisible.set(true)
  }

  showDeclinedConnections() {
    this.signalService.declinedConnectionsDialogIsVisible.set(true)
  }
  

  generatePDF() {
    if (this.content && this.content.nativeElement) {
      const contentElement = this.content.nativeElement;
      var reportName: string = '';
      if (this.currentModal === 'eligibility') {
        reportName = "INVESTOR ELIGIBILITY REPORT"
      } else if (this.currentModal === 'preparedness') {
        reportName = "INVESTOR PREPAREDNES REPORT"
      }
      this._pdfService.generatePDF(contentElement, reportName);
    } else {
      console.error('Content element is null or undefined.');
    }
  }

  generateBusinessInformationReport() {
    if (this.business_content && this.business_content.nativeElement) {
      const contentElement = this.business_content.nativeElement;
      var reportName: string = '';
      reportName = "BUSINESS INFORMATION REPORT"
      this._pdfService.generatePDF(contentElement, reportName);
    } else {
      console.error('Content element is null or undefined.');
    }
  }

  generateImpactElementReport() {
    if (this.impact_content && this.impact_content.nativeElement) {
      const contentElement = this.impact_content.nativeElement;
      var reportName: string = '';
      reportName = "IMPACT ELEMENT ASSESMENT REPORT"
      this._pdfService.generatePDF(contentElement, reportName);
    } else {
      console.error('Content element is null or undefined.');
    }
  }

  viewMatchedInvestor(id:number){
    this.signalService.matchedInvestorsDialogIsVisible.set(false);
    this._router.navigateByUrl(`/business/my-business/investors/matched-${id}`)
  }

  viewConnectedInvestor(id:number){
    this.signalService.connectedInvestorsDialogIsVisible.set(false);
    this._router.navigateByUrl(`/business/my-business/investors/connected-${id}`)
  }

  viewConnectionRequest(id:number){
    this.signalService.connectionRequestsDialogIsVisible.set(false);
    this._router.navigateByUrl(`/business/my-business/investors/requested-${id}`)
  }

  approveConnectionRequest(uuid: string){
    this.response$ =this._scoringService.respondToInvestorConnectionRequest(uuid, 'approve').pipe(tap(res =>{
      return this.reload();
    }))
  }

  declineConnectionRequest(uuid: string){
    this.decline_uuid = uuid
    this.select_reasons = true
  }





  revokeConnection(id:number){
    this.signalService.connectionRequestsDialogIsVisible.set(false);
    this._router.navigateByUrl(`/business/my-business/investors/connected-${id}`)
  }

  viewReasonsForDecline(id:number){
    this.signalService.declinedConnectionsDialogIsVisible.set(false);
    this._router.navigateByUrl(`/business/my-business/investors/declined-${id}`)
  }

  ngOnDestroy(): void {
    this.eligibilityScore =0;
    this.preparednessScore =0;
    this.factSheetAnswers =[];
    this.impactElementAnswers =[];
    this.stats = { matched: 0, connected: 0, interesting: 0, declined: 0, requested: 0}
  }

  back(){
    this.select_reasons = false
  }

  submit(){
    const selectedReasons: string[] = this.declineForm.get('reasons')?.value;

    let data = {
       declineReasons: selectedReasons
    }

    this.response$ =this._businessMatchingService.declineConnectionRequestBusiness( this.decline_uuid,data ).pipe(tap(res =>{
      return this.reload();
    }))

    this.select_reasons = false
  }

}
