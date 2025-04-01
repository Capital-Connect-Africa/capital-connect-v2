import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from "../../../../components/slider/slider.component";
import { TimelineModule } from 'primeng/timeline';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputFieldComponent } from "../../../../components/input-field/input-field.component";
import { ButtonComponent } from "../../../../components/button/button.component";

@Component({
  selector: 'auth-layout',
  imports: [TimelineModule, ProgressBarModule, InputFieldComponent, ButtonComponent],
  templateUrl: './InvestorOnboardingPage.component.html',
  styleUrl: './InvestorOnboardingPage.component.scss'
})
export class InvestorOnboardingPageComponent {
    events!:any[];
    progress_bar_value:number = 40

    ngOnInit(){

    }

    constructor() {
        this.events = [
            { status: 'Investment Profile Set Up', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'Investment Range', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
            { status: 'Sectors of Interest', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
            { status: 'Investment Criteria & Impact', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
        ];
    }
    
}
