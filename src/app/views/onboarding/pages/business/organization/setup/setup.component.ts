import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StepOneComponent } from "../step-one/step-one.component";
import { StepTwoComponent } from "../step-two/step-two.component";
import { StepThreeComponent } from "../step-three/step-three.component";
import { STEP } from '../../../../../../features/onboarding/enums/steps.enum';

@Component({
  selector: 'app-setup',
  imports: [CommonModule, StepOneComponent, StepTwoComponent, StepThreeComponent],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})

export class SetupComponent {
  paramsSubscription$ =new Observable();
  private _activatedRoute =inject(ActivatedRoute)
  possibleSteps =STEP
  currentStep:STEP = STEP.STEP_ONE
  steps =[STEP.STEP_ONE, STEP.STEP_TWO, STEP.STEP_THREE]

  ngOnInit(){
    this.paramsSubscription$ =this._activatedRoute.params.pipe(tap(param =>{
      const step:STEP =param['step']
      if(this.steps.includes(step)){
       this.currentStep =step
      }else{
        // throw 404
      }
    }))
  }
}
