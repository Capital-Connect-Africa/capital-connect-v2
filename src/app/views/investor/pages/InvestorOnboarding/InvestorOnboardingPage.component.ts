import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from "../../../../components/slider/slider.component";
import { TimelineModule } from 'primeng/timeline';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputFieldComponent } from "../../../../components/input-field/input-field.component";
import { ButtonComponent } from "../../../../components/button/button.component";
import { CommonModule } from '@angular/common';
import { Step } from '../../../../features/onboarding/interfaces/step.interface';

@Component({
  selector: 'app-investor-onboarding',
  imports: [TimelineModule, ProgressBarModule, InputFieldComponent, ButtonComponent,CommonModule],
  templateUrl: './InvestorOnboardingPage.component.html',
  styleUrl: './InvestorOnboardingPage.component.scss'
})
export class InvestorOnboardingPageComponent {
    events!:any[];
    progress_bar_value:number = 40

    steps: Step[] =[
        {label: 'Investment Profile Setup', done: true, },
        {label: 'Investment Range', isActive: true, done: false,},
        {label: 'Sectors of Interest', done: false,},
        {label: 'Investment Criteria & Impact', done: false,},
    ];
    
}
