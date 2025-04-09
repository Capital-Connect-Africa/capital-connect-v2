import {Component, inject} from '@angular/core';
import {Question, Section, SubSection, SubSectionInput} from "../../interfaces";
import {QUESTION_FORM_STEPS} from "../../../../shared/interfaces/question.form.steps.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormStateService} from "../../services/form-state/form-state.service";
import {QuestionsService} from "../../services/questions/questions.service";
import {CommonModule} from "@angular/common";
import {Observable, tap} from "rxjs";
// import _default from "chart.js/dist/plugins/plugin.title";
// import id = _default.id;
import {UiComponent} from "../../components/ui/ui.component";

@Component({
  selector: 'app-create-subsection',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, UiComponent
  ],
  templateUrl: './create-subsection.component.html',
  styleUrl: './create-subsection.component.scss'
})
export class CreateSubsectionComponent {
  section!:Section;
  questions:Question[] =[];
  sectionId!:number;
  private _activatedRoute = inject(ActivatedRoute);
  private _fb = inject(FormBuilder);
  private _formStateService = inject(FormStateService);
  private _router = inject(Router);
  private _questionsService = inject(QuestionsService);

  subsectionForm = this._fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  questions$ = this._activatedRoute.paramMap .pipe(tap((res) =>{
    // @ts-ignore
    const id =Number(res.params['id']);
    this.sectionId =id;
    this._questionsService.getSingleSection(id).pipe(tap(vals => {
      this.section =vals;
    })).subscribe()
  }))


  subsectionForm$ = this.subsectionForm.valueChanges.pipe(tap(vals => {
    const input: SubSectionInput = {
      sectionId: this.sectionId,
      name: vals.name as string,
      description: vals.description as string
    }
    this._formStateService.setSubsectionForm(input);
    this._formStateService.setSubSectionFormIsValid(this.subsectionForm.valid);
  }));

  isSubsectionFormValid$ = this._formStateService.subsectionFormIsValid$.pipe(tap(isValid => {
    this.isSubsectionFormValid = isValid;
  }));

  isSubsectionFormValid = false;

  submit() {
    this._formStateService.createSubsection(this.sectionId).pipe(tap(vals => {
      this.subsectionForm.reset()
    })).subscribe()

  }

  cancel() {
    this._router.navigateByUrl(`/questions/section/${this.sectionId}`);
  }
}
