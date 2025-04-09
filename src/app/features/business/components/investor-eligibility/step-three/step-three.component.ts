import { RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DropdownModule } from "primeng/dropdown";
import { Component, inject } from '@angular/core';
import { MultiSelectModule } from "primeng/multiselect";
import { AuthModule } from "../../../../auth/modules/auth.module";
import { catchError, EMPTY, Observable, switchMap, tap } from "rxjs";
import { Question, QuestionType } from "../../../../questions/interfaces";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { BusinessPageService } from "../../../services/business-page/business.page.service";
import { QuestionsService } from "../../../../questions/services/questions/questions.service";
import { UserSubmissionsService } from '../../../../../core/services/storage/user-submissions.service';
import { RequestType, Submission, SubmissionService, SubMissionStateService } from "../../../../../shared";
import { loadInvestorEligibilityQuestions } from "../../../../../shared/business/services/onboarding.questions.service";
import { QuestionsAnswerService } from "../../../../../shared/business/services/question.answers.service";
import { SignalsService } from "../../../../../core/services/signals/signals.service";

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule, AuthModule, ReactiveFormsModule, DropdownModule, MultiSelectModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent {
  fieldType =QuestionType;
  questions: Question[] = [];
  private _formBuilder =inject(FormBuilder)
  private _signalsService =inject(SignalsService);
  formGroup: FormGroup =this._formBuilder.group({});
  private _pageService = inject(BusinessPageService);
  private _questionService = inject(QuestionsService);
  private _submissionService = inject(SubmissionService);
  private _questionAnswersService =inject(QuestionsAnswerService);
  private _submissionStateService = inject(SubMissionStateService);
  private _userSubmissionsStorageService =inject(UserSubmissionsService);

  submission$ =new Observable<unknown>();
  questions$ =  this._questionService.getQuestionsOfSubSection(loadInvestorEligibilityQuestions().STEP_THREE).pipe(
    switchMap(questions =>{
      return this._questionAnswersService.investorEligibility(questions)
    }),
    tap(res =>{
      this.questions = res;
      this._createFormControls();
    })
  )

  private _createFormControls() {
    this.questions.forEach(question => {
      if (question.type === this.fieldType.MULTIPLE_CHOICE) {
        const answer =question.defaultValues??[];
        this.formGroup.addControl('question_' + question.id, this._formBuilder.control(answer.map(a =>a.answerId), Validators.required));
      } else if(question.type ===this.fieldType.SINGLE_CHOICE || question.type ===this.fieldType.TRUE_FALSE){
        const answer =(question.defaultValues??[]).at(0);
        this.formGroup.addControl('question_' + question.id, this._formBuilder.control(answer? answer.answerId??'':'', Validators.required));
      } else {
        const answer =(question.defaultValues??[]).at(0);
        this.formGroup.addControl('question_' + question.id, this._formBuilder.control(answer? answer.text??'':'', Validators.required));
      }
    });
  }

  setNextStep(){
    this._pageService.setCurrentPage(3)
  }
  goBack(){
    this._pageService.setCurrentStep(2);
  }

  handleSubmit(){
    const formValues = this.formGroup.value;
    const submissionData: Submission[] = [];
    this.questions.forEach(question => {
      if (question.type === this.fieldType.MULTIPLE_CHOICE) {
        const selectedAnswers = formValues['question_' + question.id];
        const prevSubmissions =question.defaultValues;
        selectedAnswers.forEach((answerId: number) => {
          const sub =prevSubmissions?.find(s =>s.answerId ===answerId);
          submissionData.push({
            questionId: question.id,
            answerId: answerId,
            id: sub?.submissionId,
            text: ''
          });
        });
      } else if (question.type == this.fieldType.SHORT_ANSWER) {
        const openQuestion = question.answers.find(a => a.text === 'OPEN');
        const answerId = openQuestion ? openQuestion.id : formValues['question_' + question.id]

        submissionData.push({
          questionId: question.id,
          answerId: parseInt(answerId),
          id: question.submissionId,
          text: formValues['question_' + question.id]
        });
      }
      else {
        submissionData.push({
          questionId: question.id,
          answerId: Number(formValues['question_' + question.id]),
          id: question.submissionId,
          text: question.type !== this.fieldType.SINGLE_CHOICE && question.type !== this.fieldType.TRUE_FALSE ? formValues['question_' + question.id] : ''
        });
      }
    });
    this._userSubmissionsStorageService.saveInvestorEligibilitySubmissionProgress(submissionData, 3);
    const requestType =this._signalsService.userSectionSubmissions()?.investor_eligibility.length? RequestType.EDIT: RequestType.SAVE
    this.submission$ =this._submissionService.saveSectionSubmissions(this._userSubmissionsStorageService.investorEligibilitySubmissions, requestType).pipe(switchMap(res =>{
      return this._submissionStateService.getSectionSubmissions(true)
    }),
    tap(res =>{
      this._pageService.setCurrentMode(requestType);
      this._userSubmissionsStorageService.investorEligibilitySubmissions =[];
      this.setNextStep()
    }),
    catchError(err =>{
      return EMPTY;
    }))
  }
}
