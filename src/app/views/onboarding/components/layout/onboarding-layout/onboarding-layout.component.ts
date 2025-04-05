import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TimelineModule } from 'primeng/timeline';
import { Step } from '../../../../../features/onboarding/interfaces/step.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding-layout',
  imports: [RouterOutlet, TimelineModule, CommonModule],
  templateUrl: './onboarding-layout.component.html',
  styleUrl: './onboarding-layout.component.scss'
})

export class OnboardingLayoutComponent {
  steps: Step[] =[
    {label: 'Signup', done: true, },
    {label: 'Organization Setup', isActive: true, done: false,},
    {label: 'Investor Preparedness', done: false,},
    {label: 'Investor/Funder Eligibility', done: false,},
    {label: 'Business Information', done: false,},
  ];
}
