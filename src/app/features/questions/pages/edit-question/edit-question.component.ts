import { Component, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { QUESTION_FORM_STEPS } from "../../../../shared/interfaces/question.form.steps.enum";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { FormStateService } from "../../services/form-state/form-state.service";
import { Question, QuestionInput, QuestionType, SubSection } from "../../interfaces";
import { UiComponent } from "../../components/ui/ui.component";
import { QuestionsService } from "../../services/questions/questions.service";

@Component({
  selector: 'app-edit-question',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UiComponent],
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.scss'
})
export class EditQuestionComponent {
  private _fb = inject(FormBuilder)
  private _activatedRoute = inject(ActivatedRoute);
  private _formStateService = inject(FormStateService)
  private _questionsService = inject(QuestionsService);
  private _router = inject(Router);
  
  fetchedSubSection$: Observable<SubSection> = new Observable();
  fetchQuestionBeingEdited$: Observable<Question> = new Observable();
  subsections$: Observable<SubSection> = new Observable()
  updateQuestion$: Observable<Question> = new Observable();
  
  protected readonly STEPS = QUESTION_FORM_STEPS;
  private _routerId!: string;
  questionId!: number;
  isQuestionFormValid = false;
  subsectionId!: number;
  question!: Question;

  questionForm = this._fb.group({
    subsectionId: ['', Validators.required],
    text: ['', Validators.required],
    type: ['', Validators.required],
    tooltip: [''],
    order: [null as unknown as number, Validators.required],
  });

  params$ = this._activatedRoute.params.pipe(tap(param => {

    const ids = param['id'].trim().split('-')
    this.subsectionId = Number(ids.at(1));
    this.questionId = Number(ids.at(2));
    this._routerId = ids.slice(0, 2).join('-')
    this.fetchedSubSection$ = this._questionsService.getSingleSubsection(this.subsectionId);

    this.fetchQuestionBeingEdited$ = this._formStateService.getCurrentQuestionBeingEdited(this.questionId).pipe(tap(question => {
      this.question = question;
      this.questionForm.patchValue({
        subsectionId: question.id.toString(),
        type: question.type,
        text: question.text,
        order: question.order,
        tooltip: question.tooltip
      });
    }));
  }));

  questionTypes: { label: string, value: QuestionType }[] = [
    { label: 'Multiple Choice', value: QuestionType.MULTIPLE_CHOICE },
    { label: 'Single Choice', value: QuestionType.SINGLE_CHOICE },
    { label: 'Short Answer', value: QuestionType.SHORT_ANSWER },
    { label: 'True/ False', value: QuestionType.TRUE_FALSE }
  ];

  questionForm$ = this.questionForm.valueChanges.pipe(tap(vals => {
    this._formStateService.setQuestionForm(vals as QuestionInput)
    this._formStateService.setQuestionFormIsValid(this.questionForm.valid);
  }))

  isQuestionFormValid$ = this._formStateService.questionFormIsValid$.pipe(tap(isValid => {
    this.isQuestionFormValid = isValid;
  }));

  submit() {
    const { type, text } = this.questionForm.value as Question;
    this.question = { ...this.question, type, text };
    this.updateQuestion$ =
      this._formStateService.updateQuestion(this.question, this.subsectionId)
  }

  cancel() {
    this._router.navigateByUrl(`questions/sub-section/${this._routerId}`);
  }
}
