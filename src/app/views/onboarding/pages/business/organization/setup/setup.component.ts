import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { STEP } from '../../../../../../features/onboarding/enums/steps.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setup',
  imports: [CommonModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})

export class SetupComponent {
  private _activatedRoute =inject(ActivatedRoute)
  currentStep:STEP =STEP.STEP_ONE
  step:STEP =this._activatedRoute.snapshot.params['step']
  steps =[STEP.STEP_ONE, STEP.STEP_TWO, STEP.STEP_THREE]

  ngOnInit(){
    if(!this.steps.includes(this.step)){
      // show 404 page
    }
    this.currentStep =this.step
  }
}
