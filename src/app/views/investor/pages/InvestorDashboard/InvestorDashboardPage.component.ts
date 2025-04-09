import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from "../../../../components/slider/slider.component";
import { TimelineModule } from 'primeng/timeline';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputFieldComponent } from "../../../../components/input-field/input-field.component";
import { ButtonComponent } from "../../../../components/button/button.component";

@Component({
  selector: 'app-investor-dashboard',
  imports: [TimelineModule, ProgressBarModule],
  templateUrl: './InvestorDashboardPage.component.html',
  styleUrl: './InvestorDashboardPage.component.scss'
})

export class InvestorDashboardPageComponent {
    events!:any[];
    progress_bar_value:number = 40

    ngOnInit(){

    }

    
}
